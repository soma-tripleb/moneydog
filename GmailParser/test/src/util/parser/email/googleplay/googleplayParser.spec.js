import assert from 'assert';

import GooglePlayParser from 'src/util/parser/email/googleplay/googleplayParser';
import GooglePlay from 'src/model/dto/googleplay';

import GOOGLEPLAY_WATCHA_RECEIPT_JSON from 'test/resources/mock/email/googleplay/googleplayWatchaReceipt';

import GOOGLEPLAY_RECEIPT_BODY1_JSON from 'test/resources/mock/email/googleplay/googleplayReceiptBody1';

describe.only('googleplayParser는', () => {
  it('테스트용 JSON 데이터를 가지고, HTML TAG 파싱 성공 시', async () => {
    const GooglePlayDTO = new GooglePlay();

    try {
      const result = await GooglePlayParser.metadataParse(GOOGLEPLAY_WATCHA_RECEIPT_JSON, GooglePlayDTO, GooglePlayParser.iframeParse);

      assert.equal('왓챠플레이', result.name);
      assert.equal(7900, result.price);
      assert.equal('2019. 8. 9', result.date);
      assert.equal('2019. 9. 9', result.renewal);
      assert.equal(1, result.periodMonth);

    } catch (err) {
      throw err;
    }
  });

  it('body1을 정규표현식으로 파싱 성공 시', (done) => {
    const str = GOOGLEPLAY_RECEIPT_BODY1_JSON.body1;

    const from = str.indexOf('보낸사람:');
    const date = str.indexOf('Date:');
    const subject = str.indexOf('Subject:');
    const to = str.indexOf('To:');
    const orderNum = str.indexOf('주문 번호: *');
    const orderDate = str.indexOf('주문 날짜: *');
    const promotion = str.indexOf('상품 가격');
    const renewalDate = str.indexOf('자동 갱신 날짜:');
    const price = str.indexOf('합계:');
    const end = str.indexOf('결제 방법:');

    const fromResult = str.substring(from, date);
    const dateResult = str.substring(date, subject);
    const subjectResult = str.substring(subject, to);
    const toRe = str.substring(to, orderNum);
    const orderNumRe = str.substring(orderNum, orderDate);
    const orderDateRe = str.substring(orderDate, promotion);
    const promotionRe = str.substring(promotion, renewalDate);
    const renewalDateRe = str.substring(renewalDate, price);
    const priceRe = str.substring(price, end);

    console.log(fromResult);
    console.log(dateResult);
    console.log(subjectResult);
    console.log(toRe);
    console.log(orderNumRe);
    console.log(orderDateRe);
    console.log(promotionRe);
    console.log(renewalDateRe);
    console.log(priceRe);

    done();
  });
});