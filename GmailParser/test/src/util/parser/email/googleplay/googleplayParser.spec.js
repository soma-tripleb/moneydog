import should from 'should';

import GooglePlayParser from 'src/util/parser/email/googleplay/googleplayParser';
import GooglePlay from 'src/model/dto/googleplay';

import GP_WATCHA_MESSAGES from 'test/resources/mock/email/googleplay/GP_WATCHA_MESSAGES';

import FWD_GP_WATCHA_BODY1 from 'test/resources/mock/email/googleplay/FWD_GP_WATCHA_BODY1';
import FWD_GP_WATCHA_BODY1_NO_ENTER from 'test/resources/mock/email/googleplay/FWD_GP_WATCHA_BODY1_NO_ENTER';

describe('googleplayParser를 만들기 위해서', () => {
  describe('개행을 포함 한 데이터', () => {

    let str = '';

    beforeEach(() => {
      str = FWD_GP_WATCHA_BODY1.data;
    });

    it('가지고 올 수 있는 데이터', () => {
      const indexing = str.split(`\r\n`);

      const from = indexing[0];
      const date = indexing[1];
      const goods = indexing[14];
      const renewal = indexing[16];
      const total = indexing[17];
      const service = indexing[36];

      '보낸사람: Google Play <googleplay-noreply@google.com>'.should.be.exactly(from);
      'Date: 2019년 8월 9일 (금) 오후 2:51'.should.be.exactly(date);
      '1개월 이용권 (왓챠플레이) 매월 ₩7,900'.should.be.exactly(goods);
      '월간 구독 ‐ 자동 갱신 날짜: 2019. 9. 9.'.should.be.exactly(renewal);
      '합계: 매월 ₩7,900'.should.be.exactly(total);
      '왓챠'.should.be.exactly(service);
    });
  });

  describe('개행을 포함하지 않은 데이터', () => {
    let str = '';

    beforeEach(() => {
      str = FWD_GP_WATCHA_BODY1_NO_ENTER.data;
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
  describe('테스트용 JSON 데이터를 통해서', () => {
    it('`HTML TAG` 파싱 성공 시', () => {
      const GooglePlayDTO = new GooglePlay();

      GooglePlayParser.metadataParse(GP_WATCHA_MESSAGES, GooglePlayDTO, GooglePlayParser.iframeParse)
        .then((result) => {
          result.should.have.property('name', '왓챠플레이');
          result.should.have.property('price', 7900);
          result.should.have.property('date', '2019. 8. 9');
          result.should.have.property('renewal', '2019. 9. 9');
          result.should.have.property('periodMonth', 1);
        });
    });

    describe('body1 데이터를 문자열로 잘라서 파싱', () => {
      it('성공 시', () => {
        const result = GooglePlayParser.body1Parse(FWD_GP_WATCHA_BODY1_NO_ENTER.data);

        result.renewal.should.exactly('2019. 9. 9.');
        result.price.should.exactly('매월 ₩7,900(VAT ₩0 포함)');
      });
    });
  });
});