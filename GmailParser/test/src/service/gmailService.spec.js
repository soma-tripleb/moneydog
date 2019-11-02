import should from 'should';

import GP_WATCHA_MESSAGES from 'test/resources/mock/email/googleplay/GP_WATCHA_MESSAGES';
import GmailParser from 'src/util/parser/email/gmailParser';
import GooglePlayParser2 from 'src/util/parser/email/googleplay/googleplayParser2';
import Gmail from 'src/model/dto/gmail';

describe.only('GmailService는', () => {
  describe('테스트용 데이터를 가지고', () => {
    describe('메타 데이터 파싱', () => {

      const TEST_MESSAGES = GP_WATCHA_MESSAGES;
      const GmailDTO = new Gmail();

      before(() => {
        const result = GmailParser.metadataParse(TEST_MESSAGES, GmailDTO);

        'Google Play <googleplay-noreply@google.com>'.should.be.exactly(result.from);
        'Google Play 주문 영수증(2019. 8. 9)'.should.be.exactly(result.subject);
      });

      it('`Google`에서 온 `영수증`임을 확인 하고 파싱하기', () => {
        const GOOGLE = 'Google Play <googleplay-noreply@google.com>';

        if (GmailDTO.from == GOOGLE) {
          const result = GooglePlayParser2.bodyParser(GmailDTO.body1);

          console.log(result);
        }
      });
    });
  });
});