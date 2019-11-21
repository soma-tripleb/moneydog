import should from 'should';

import GmailParser from '../../../src/util/parser/email/gmailParser';
import GooglePlayParser from '../../../src/util/parser/email/googleplay/googleplayParser';

import GmailService from '../../../src/service/gmailService';
import Gmail from '../../../src/model/dto/gmail';

import GmailApi from '../../../src/util/gmailApi';
import UserQuery from '../../../src/db/userQuery';

import GP_WATCHA_MESSAGES from '../../../test/resources/mock/email/googleplay/GP_WATCHA_MESSAGES';
import FWD_GP_WATCHA_MESSAGES from '../../../test/resources/mock/email/googleplay/FWD_GP_WATCHA_MESSAGES';

describe('`GmailService`는', () => {

  const testuser = 'moneydogtest1@gmail.com';
  let refreshToken;

  before(() => {
    return UserQuery.getRefreshToken(testuser)
      .then((result) => {
        refreshToken = result;
      });
  });

  describe('쿼리 검색 결과로 메일 ID 리스트를 가져온다.', () => {

    const SUCCESS_QUERY = '';
    const FAILURE_QUERY = 'pqkrdugndjsk';
    let Gmail;

    beforeEach(() => {
      Gmail = new GmailApi(refreshToken);
    });

    it('성공 시', () => {
      return Gmail.listMessages(testuser, SUCCESS_QUERY)
        .then((result) => {
          result.data.messages.should.be.not.empty();
          result.data.resultSizeEstimate.should.be.not.equal(0);
          result.status.should.be.equal(200);
          result.statusText.should.be.equal('OK');

          return result;
        });
    });

    it('실패 시', () => {
      return Gmail.listMessages(testuser, FAILURE_QUERY)
        .then((result) => {
          result.data.should.have.not.property('messages');
          result.data.resultSizeEstimate.should.be.equal(0);
          result.status.should.be.equal(200);
          result.statusText.should.be.equal('OK');

          return result;
        });
    });
  });

  describe.skip('테스트용 데이터를 가지고', () => {
    describe('사용자의 Gmail 메시지에서 `메타 데이터`를 파싱 한다.', () => {

      const TEST_MESSAGES = GP_WATCHA_MESSAGES;
      const GmailDTO = new Gmail();

      before(() => {
        const result = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

        'Google Play <googleplay-noreply@google.com>'.should.be.exactly(result.from);
        'Google Play 주문 영수증(2019. 8. 9)'.should.be.exactly(result.subject);
      });

      describe('파싱 결과를 통해 `Google`에서 온 `영수증`임을 확인하고 `상세 정보`를 찾는다.', () => {
        const GOOGLE = 'Google Play <googleplay-noreply@google.com>';

        let body1ParsingOfIndex;
        let body1ParsingOfSplit;
        let body2ParsingOfTag;

        before(() => {
          if (GmailDTO.from == GOOGLE) {
            body1ParsingOfIndex = GooglePlayParser.body1ParserOfIndex(GmailDTO.body1);
            body1ParsingOfSplit = GooglePlayParser.body1ParserOfSplit(GmailDTO.body1);
            body2ParsingOfTag = GooglePlayParser.body2ParserOfTag(GmailDTO.body2);
          } else {
            throw err;
          }
        });

        describe('`메타 데이터` 중에서 body1(메일에서 텍스트만 모아놓은 부분)에서 필요한 정보를', () => {
          it('키워드 인덱스 위치로 값 뽑아낼 때', () => {
            '2019. 9. 9.'.should.be.exactly(body1ParsingOfIndex.renewal);
            `매월 ₩7,900\r\n\r\n(VAT ₩0 포함)`.should.be.exactly(body1ParsingOfIndex.price);
          });

          it('개행 문자를 기준으로 나눠서 값 뽑아낼 때', () => {
            '월간 구독 ‐ 자동 갱신 날짜: 2019. 9. 9.'.should.be.exactly(body1ParsingOfSplit.renewal);
            '합계: 매월 ₩7,900'.should.be.exactly(body1ParsingOfSplit.total);
            '왓챠'.should.be.exactly(body1ParsingOfSplit.service);
          });
        });

        describe('`메타 데이터` 중에서 body2(HTML 부분)에서 필요한 정보를', () => {
          it('TAG 파싱으로 값 뽑아낼 때', () => {
            '왓챠플레이'.should.be.exactly(body2ParsingOfTag.name);
            (7900).should.be.exactly(body2ParsingOfTag.price);
            '2019. 8. 9'.should.be.exactly(body2ParsingOfTag.date);
            '2019. 9. 9'.should.be.exactly(body2ParsingOfTag.renewal);
            (1).should.be.exactly(body2ParsingOfTag.periodMonth);
          });
        });
      });

      describe('`divideByFrom 메서드를 테스트 한다.`', () => {

        const TEST_MESSAGES = GP_WATCHA_MESSAGES;
        const GmailDTO = new Gmail();
        let metadata;
        const metadataList = [];

        before(() => {
          metadata = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

          metadataList.push(metadata);
        });

        it('성공 시', () => {
          GmailService.divideByFrom(metadataList)
            .then((info) => {
              '왓챠플레이'.should.be.exactly(info[0].name);
              (7900).should.be.exactly(info[0].price);
              '2019. 8. 9'.should.be.exactly(info[0].date);
              '2019. 9. 9'.should.be.exactly(info[0].renewal);
              (1).should.be.exactly(info[0].periodMonth);
            })
            .catch((err) => {
              throw err;
            });
        });
      });
    });
  });

  describe.skip('포워딩 된 테스트용 데이터를 가지고,', () => {
    describe('사용자의 Gmail 메시지에서 `메타 데이터`를 파싱 한다.', () => {

      const TEST_MESSAGES = FWD_GP_WATCHA_MESSAGES;
      const GmailDTO = new Gmail();
      let metadata;
      const metadataList = [];

      before(() => {
        metadata = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

        '\"김재연\" <jimmyjaeyeon@gmail.com>'.should.be.exactly(metadata.from);
        'Fwd: Google Play 주문 영수증(2019. 8. 9)'.should.be.exactly(metadata.subject);

        metadataList.push(metadata);
      });

      describe('`divideByFrom 메서드를 테스트 한다.`', () => {
        it('성공 시 (body1ParserOfIndex 메서드 사용)', () => {
          GmailService.divideByFrom(metadataList)
            .then((info) => {
              '2019. 9. 9.'.should.be.exactly(info[0].renewal);
              '매월 ₩7,900\r\n(VAT ₩0 포함)'.should.be.exactly(info[0].price);
            })
            .catch((err) => {
              throw err;
            });
        });
      });
    });
  });
});
