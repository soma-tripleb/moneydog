import assert from 'assert';

import AppleParser2 from '../../../../src/util/parser/email/apple/appleParser2';
import AppleReceiptForm from '../../../../src/model/dto/mail/apple2';
import AppleMusicJSON from '../../../resources/mock/email/apple/appleMusicReceipt.json';

describe('Apple 영수증 Parser 테스트', () => {

  describe('영수증 메일 부분, 파싱 확인', () => {
    it('#mailParsing', async () => {

      const AppleMusic = new AppleReceiptForm();

      try {
        const result = await AppleParser2.metadataParse(AppleMusicJSON, AppleMusic, AppleParser2.iframeParse);

        assert.equal('16c3b300da121d9c', result.id);
        assert.equal('영수증 APPLE ID jimmyjaeyeon@gmail.com 청구지 주소 MasterCard .... 1228 kimJaeyeon 흥덕중앙로 105번길 24 동원로얄듀크 1005동 1502호 202호 용인시/기흥구, 경기도 446-908 날짜 2019.07.29 주문 ID MMZVFL7XMM 문서 번호 197281619562 Apple 서비스 가격', result.snippet);
        assert.equal('2019.07.29', result.date);
        assert.equal('Apple <no_reply@email.apple.com>', result.from);
        assert.equal('Apple에서 발행한 영수증입니다.', result.subject);
        assert.equal('Apple Music 구독 멤버십', result.name);
        assert.equal('8900', result.price);

        return result;
      } catch (err) {
        throw err;
      }
    });
  });
});