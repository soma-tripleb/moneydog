import should from 'should';

import GmailService from 'src/service/gmailService';
import GmailParser from 'src/util/parser/email/gmailParser';
import GooglePlayParser from 'src/util/parser/email/googleplay/googleplayParser';

import GP_WATCHA_MESSAGES from 'test/resources/mock/email/googleplay/GP_WATCHA_MESSAGES';
import FWD_GP_WATCHA_MESSAGES from 'test/resources/mock/email/googleplay/FWD_GP_WATCHA_MESSAGES';

import Gmail from 'src/model/dto/gmail';

describe('googleplayParser를 만들기 위해서', () => {
  describe('개행을 포함 한 데이터', () => {

    const TEST_MESSAGES = FWD_GP_WATCHA_MESSAGES;
    const GmailDTO = new Gmail();
    let str = '';

    before(() => {
      const metadata = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

      str = metadata.body1;
    });

    it('가지고 올 수 있는 데이터', () => {
      const indexing = str.split(`\r\n`);

      const from = indexing[1];
      const date = indexing[2];
      const goods = indexing[15];
      const renewal = indexing[17];
      const total = indexing[18];
      const service = indexing[37];

      '보낸사람: Google Play <googleplay-noreply@google.com>'.should.be.exactly(from);
      'Date: 2019년 8월 9일 (금) 오후 2:51'.should.be.exactly(date);
      '1개월 이용권 (왓챠플레이) 매월 ₩7,900'.should.be.exactly(goods);
      '월간 구독 ‐ 자동 갱신 날짜: 2019. 9. 9.'.should.be.exactly(renewal);
      '합계: 매월 ₩7,900'.should.be.exactly(total);
      '왓챠'.should.be.exactly(service);
    });
  });

  describe('개행을 포함하지 않은 데이터', () => {

    const TEST_MESSAGES = FWD_GP_WATCHA_MESSAGES;
    const GmailDTO = new Gmail();
    let str;

    before(() => {
      const metadata = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

      str = metadata.body1.replace(/\r\n/gi, '');
    });

    it('가지고 올 수 있는 데이터', () => {

      const from = str.indexOf('보낸사람');
      const date = str.indexOf('Date');
      const subject = str.indexOf('Subject');
      const to = str.indexOf('To');
      const orderNum = str.indexOf('주문 번호');
      const orderDate = str.indexOf('주문 날짜');
      const promotion = str.indexOf('상품 가격');
      const renewalDate = str.indexOf('자동 갱신 날짜');
      const price = str.indexOf('합계');
      const end = str.indexOf('결제 방법');

      const fromResult = str.substring(from, date);
      const dateResult = str.substring(date, subject);
      const subjectResult = str.substring(subject, to);
      const toResult = str.substring(to, orderNum);
      const orderNumResult = str.substring(orderNum, orderDate);
      const orderDateResult = str.substring(orderDate, promotion);
      const promotionResult = str.substring(promotion, renewalDate);
      const renewalDateResult = str.substring(renewalDate, price);
      const priceResult = str.substring(price, end);

      '보낸사람: Google Play <googleplay-noreply@google.com>'.should.be.exactly(fromResult);
      'Date: 2019년 8월 9일 (금) 오후 2:51'.should.be.exactly(dateResult);
      'Subject: Google Play 주문 영수증(2019. 8. 9)'.should.be.exactly(subjectResult);
      'To: <jimmyjaeyeon@gmail.com>[image: Google Play]<https://www.google.com/appserve/mkt/p/AFnwnKVacG8lBVQt00FkoINN5MqmbdnIIv8qFCDP4bo9C3a9JgigiaoTjRqkLsupyPJhUDH-XIR8BFOWQMJAUb18NyKthnMGi99Xm2OJ51V9mjGwxors5Q>감사합니다Google Play에서 왓챠의 구독권을 구매하셨습니다.* '.should.be.exactly(toResult);
      '주문 번호: * GPA.3303-9400-7953-78210* '.should.be.exactly(orderNumResult);
      '주문 날짜: * 2019. 8. 9 오후 2시 51분 28초'.should.be.exactly(orderDateResult);
      '상품 가격1개월 이용권 (왓챠플레이) 매월 ₩7,900월간 구독 ‐ '.should.be.exactly(promotionResult);
      '자동 갱신 날짜: 2019. 9. 9.'.should.be.exactly(renewalDateResult);
      '합계: 매월 ₩7,900(VAT ₩0 포함)'.should.be.exactly(priceResult);
    });

    describe('`자동 갱신 날짜`, `합계` 문자열이 존재', () => {
      it('성공 시', () => {

        const renewal = str.match('자동 갱신 날짜');
        const price = str.match('합계');

        renewal[0].should.be.exactly('자동 갱신 날짜');
        price[0].should.be.exactly('합계');
      });

      it('실패 시', () => {

        const renewal = str.match('자동 갱신 날쫘');

        (renewal === null).should.be.true;
      });
    });

    describe('`자동 갱신 날짜`, `합계` 데이터 추출', () => {
      it('성공 시', () => {

        const renewalStartIdx = str.indexOf('자동 갱신 날짜');
        const renewalLastIdx = str.indexOf('합계');
        const priceStartIdx = str.indexOf('합계');
        const priceLastIdx = str.indexOf('결제 방법');

        const renewalStr = str.substring(renewalStartIdx, renewalLastIdx);
        const priceStr = str.substring(priceStartIdx, priceLastIdx);

        const renewal = renewalStr.split(':')[1];
        const price = priceStr.split(':')[1];

        renewal.should.be.exactly(' 2019. 9. 9.');
        price.should.be.exactly(' 매월 ₩7,900(VAT ₩0 포함)');
      });

      it('실패 시', () => {

        const renewalStartIdx = str.indexOf('자동 갱신 날쫘');

        renewalStartIdx.should.equal(-1);
      });
    });
  });
});

describe('googleplayParser는', () => {
  describe('테스트 용 JSON 데이터로 테스트를 진행한다.', () => {
    describe('`FORWARDING`으로 자신에게 보낸 메일에서', () => {

      const TEST_MESSAGES = FWD_GP_WATCHA_MESSAGES;
      const GmailDTO = new Gmail();

      let body1;
      let body2;

      before(() => {
        const mailMetadata = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

        body1 = mailMetadata.body1;
        body2 = mailMetadata.body2;
      });

      describe('body1 데이터를', () => {
        describe('문자열로 잘라서 파싱', () => {
          it('성공 시', () => {
            const result = GooglePlayParser.body1ParserOfIndex(body1);

            result.renewal.should.exactly('2019. 9. 9.');
            result.price.should.exactly('매월 ₩7,900\r\n(VAT ₩0 포함)');
          });
        });
      });

      describe('body2 데이터를', () => {
        describe('`HTML TAG` 파싱 ', () => {
          it('성공 시', () => {
            // Forwarded message 가 포함 되면서, Tag 가 바뀜
          });
        });
      });
    });

    describe('`Google Play`에서 온 메일에서', () => {
      const TEST_MESSAGES = GP_WATCHA_MESSAGES;
      const GmailDTO = new Gmail();

      let body1;
      let body2;

      before(() => {
        const mailMetadata = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

        body1 = mailMetadata.body1;
        body2 = mailMetadata.body2;
      });

      describe('body1 데이터를', () => {
        describe('문자열로 잘라서 파싱', () => {
          it('성공 시', () => {
            const result = GooglePlayParser.body1ParserOfIndex(body1);

            '2019. 9. 9.'.should.be.exactly(result.renewal);
            '매월 ₩7,900\r\n\r\n(VAT ₩0 포함)'.should.be.exactly(result.price);

          });
        });
      });

      describe('body2 데이터를', () => {
        describe('`HTML TAG` 파싱 ', () => {
          it('성공 시', () => {
            const result = GooglePlayParser.body2ParserOfTag(body2);

            '왓챠플레이'.should.be.exactly(result.name);
            (7900).should.be.exactly(result.price);
            '2019. 8. 9'.should.be.exactly(result.date);
            '2019. 9. 9'.should.be.exactly(result.renewal);
            (1).should.be.exactly(result.periodMonth);
          });
        });
      });
    });
  });

  describe('테스트 용 메일의 데이터를 이용하여, 테스트를 진행한다.', () => {

    const useremail = 'moneydogtest1@gmail.com';
    const q = 'from:(googleplay) 영수증';
    let messagesList;

  });
});