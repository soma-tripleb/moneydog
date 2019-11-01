import CommonParser from '../commonParser';
import cheerio from 'cheerio';

const GooglePlayReceiptParser = (() => {

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

    iframeParse: (dto, iframeBody) => {

      const body = iframeBody;

      let name = '';
      let price = '';
      let date = '';
      let renewal = '';
      let periodMonth = '';

      const bodyDecoded = CommonParser.base64ToUtf8(body);

      const dom = CommonParser.convertHtml(bodyDecoded);

      const $ = cheerio.load(dom);

      name = convertNameReg($(NAME_TAG).text().trim());

      price = convertPriceReg($(PRICE_TAG).text());

      date = convertDateReg($(DATE_TAG).text());

      renewal = convertRenewalReg($(RENEWAL_TAG).text());

      periodMonth = calPeriod(renewal, date);

      dto.setName(name);
      dto.setPrice(price);
      dto.setDate(date);
      dto.setRenewal(renewal);
      dto.setPeriodMonth(periodMonth);

      return dto;
    },

    // from:(google) 영수증 에 한함.
    body1Parse: (body1) => {
      const text = body1;

      const renewalStartIdx = text.indexOf('자동 갱신 날짜');
      const renewalLastIdx = text.indexOf('합계');
      const priceStartIdx = text.indexOf('합계');
      const priceLastIdx = text.indexOf('결제 방법');

      try {
        if (renewalStartIdx === -1) throw err;
        if (renewalLastIdx === -1) throw err;
        if (priceStartIdx === -1) throw err;
        if (priceLastIdx === -1) throw err;
      } catch (err) {
        throw new Error('EXPIRED_PARSER_BODY1');
      }

      const renewalStr = text.substring(renewalStartIdx, renewalLastIdx);
      const priceStr = text.substring(priceStartIdx, priceLastIdx);

      const renewal = renewalStr.split(':')[1].trim();
      const price = priceStr.split(':')[1].trim();

      return {
        renewal,
        price
      };
    }
  };
})();

export default GooglePlayReceiptParser;
