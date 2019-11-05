import CommonParser from '../commonParser';
import cheerio from 'cheerio';

const GooglePlayParser = (() => {

  const NAME_TAG = '#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span';

  const PRICE_TAG = '#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(2) > span';

  const DATE_TAG = '#gamma > div > div:nth-child(2) > div > div:nth-child(5)';

  const RENEWAL_TAG = '#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)';

  const convertNameReg = (name) => {
    const nameReg = /\(([^)]+)\)/;
    return nameReg.exec(name)[1];
  };

  const convertPriceReg = (price) => {
    const priceReg = /\₩(.*?)\n/;
    return parseInt(priceReg.exec(price)[1].replace(',', ''));
  };

  const convertRenewalReg = (renewal) => {
    const renewalReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
    return renewalReg.exec(renewal)[0];
  };

  const convertDateReg = (date) => {
    const dateReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
    return dateReg.exec(date)[0];
  };

  const calPeriod = (date, renewal) => {
    return Math.floor(Math.abs(new Date(renewal) - new Date(date)) / (1000 * 60 * 60 * 24 * 30));
  };

  return {
    metadataParse: async (json, dto, callback) => {

      const data = json.data;

      let messageId = null;
      let createAt = null;
      let from = null;
      let to = null;
      let subject = null;
      let snippet = null;
      let bodyText = null;

      data.payload.headers.some((headers) => {
        const name = headers.name.toLowerCase();

        switch (name) {
          case 'message-id':
            messageId = headers.value;
            break;
          case 'date':
            createAt = headers.value;
            break;
          case 'from':
            from = headers.value;
            break;
          case 'to':
            to = headers.value;
            break;
          case 'subject':
            subject = headers.value;
            break;
        }

        if ((messageId !== null) && (createAt !== null) && (from !== null) && (to !== null) && (subject !== null))
          return false;
      });

      snippet = data.snippet;

      bodyText = CommonParser.base64ToUtf8(data.payload.parts[0].body.data);
      const iframeBody = data.payload.parts[1].body.data;

      dto.setMessageId(messageId);
      dto.setCreateAt(createAt);
      dto.setFrom(from);
      dto.setTo(to);
      dto.setSubject(subject);
      dto.setSnippet(snippet);
      dto.setBodyText(bodyText);

      return await callback(dto, iframeBody);
    },

    // '서비스 명', '상품 정보', '가격', '결제 일', '자동 갱신 날짜'

    /*
     * from:(googleplay) 영수증, 무료'
     * '서비스 명', '상품 정보', '평가판 종료일', '평가판 이후 구독료'
     */
    body1ParseOfFree: (metadata) => {
      const text = metadata.body1;

      // '서비스 명'
      const serviceNameStartIdx = text.indexOf('Google Play에서');
      const serviceNameEndIdx = text.indexOf('에 대한 무료 평가판');

      // '상품 정보'
      const productInfoStartIdx = text.indexOf('상품 가격');
      const productInfoEndIdx = text.indexOf('합계');

      // '평가판 종료일'
      const endDateStartIdx = text.indexOf('평가판 기간이');
      const endDateInfoEndIdx = text.indexOf('에 종료됩니다.');

      // '평가판 이후 구독료'
      const originalPriceStartIdx = text.indexOf('자동으로 구독료');
      const originalPriceLastIdx = text.indexOf('가 청구됩니다.');

      const result = {
        serviceNameStartIdx,
        serviceNameEndIdx,
        productInfoStartIdx,
        productInfoEndIdx,
        endDateStartIdx,
        endDateInfoEndIdx,
        originalPriceStartIdx,
        originalPriceLastIdx
      };

      console.log(result);

      try {
        if (serviceNameStartIdx === -1) throw err;
        if (serviceNameEndIdx === -1) throw err;
        if (productInfoStartIdx === -1) throw err;
        if (productInfoEndIdx === -1) throw err;
        if (endDateStartIdx === -1) throw err;
        if (endDateInfoEndIdx === -1) throw err;
        if (originalPriceStartIdx === -1) throw err;
        if (originalPriceLastIdx === -1) throw err;
      } catch (err) {
        throw new Error('EXPIRED_PARSER_BODY1_FREE');
      }

      const serviceNameStr = text.substring(serviceNameStartIdx, serviceNameEndIdx);
      const productInfoStr = text.substring(productInfoStartIdx, productInfoEndIdx);
      const endDateStr = text.substring(endDateStartIdx, endDateInfoEndIdx);
      const originalPrice = text.substring(originalPriceStartIdx, originalPriceLastIdx);

      return {
        serviceNameStr,
        productInfoStr,
        endDateStr,
        originalPrice
      };
    },

    // from:(google) 영수증 에 한함.
    body1ParserOfIndex: (metadata) => {
      const text = metadata.body1;

      // '서비스 명'
      const serviceNameStartIdx = text.indexOf('Google Play에서');
      const serviceNameEndIdx = text.indexOf('의 구독권을 구매하셨습니다.');

      // '상품 정보'
      const productInfoStartIdx = text.indexOf('상품 가격');
      const productInfoEndIdx = text.indexOf('자동 갱신 날짜');

      // '가격'
      const priceStartIdx = text.indexOf('합계');
      const priceLastIdx = text.indexOf('결제 방법');

      // '결제 일'
      const orderDateStartIdx = text.indexOf('주문 날짜');
      const orderDateEndIdx = text.indexOf('상품 가격');

      // '자동 갱신 날짜'
      const renewalStartIdx = text.indexOf('자동 갱신 날짜');
      const renewalLastIdx = text.indexOf('합계');

      const snippet = metadata.snippet;
      const textIndex = {
        snippet,
        serviceNameStartIdx,
        serviceNameEndIdx,
        productInfoStartIdx,
        productInfoEndIdx,
        priceStartIdx,
        priceLastIdx,
        orderDateStartIdx,
        orderDateEndIdx,
        renewalStartIdx,
        renewalLastIdx
      };

      // console.log(textIndex);

      try {
        if (serviceNameStartIdx === -1) throw err;
        if (serviceNameEndIdx === -1) throw err;
        if (productInfoStartIdx === -1) throw err;
        if (productInfoEndIdx === -1) throw err;
        if (priceStartIdx === -1) throw err;
        if (priceLastIdx === -1) throw err;
        if (orderDateStartIdx === -1) throw err;
        if (orderDateEndIdx === -1) throw err;
        if (renewalStartIdx === -1) throw err;
        if (renewalLastIdx === -1) throw err;
      } catch (err) {
        throw new Error('EXPIRED_PARSER_BODY1');
      }

      const serviceNameStr = text.substring(serviceNameStartIdx, serviceNameEndIdx);
      const productInfoStr = text.substring(productInfoStartIdx, productInfoEndIdx);
      const priceStr = text.substring(priceStartIdx, priceLastIdx);
      const orderDateStr = text.substring(orderDateStartIdx, orderDateEndIdx);
      const renewalStr = text.substring(renewalStartIdx, renewalLastIdx);

      return {
        serviceNameStr,
        productInfoStr,
        priceStr,
        orderDateStr,
        renewalStr
      };
    },

    body2ParserOfTag: (body2) => {
      const htmlText = body2;

      let name = '';
      let price = '';
      let date = '';
      let renewal = '';
      let periodMonth = '';

      const dom = CommonParser.convertHtml(htmlText);

      const $ = cheerio.load(dom);

      try {
        name = convertNameReg($(NAME_TAG).text().trim());
        price = convertPriceReg($(PRICE_TAG).text());
        date = convertDateReg($(DATE_TAG).text());
        renewal = convertRenewalReg($(RENEWAL_TAG).text());
        periodMonth = calPeriod(renewal, date);
      } catch (err) {
        throw new Error(`BODY2_PARSER_OF_TAG_ERROR ` + err);
      }

      return {
        name,
        price,
        date,
        renewal,
        periodMonth
      };
    }
  };
})();

export default GooglePlayParser;
