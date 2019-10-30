import cheerio from 'cheerio';
import GOOGLEPLAY_WATCHA_RECEIPT from '../../../../../test/resources/mock/email/googleplay/googleplayWatchaReceipt.json';

import CommonParser from '../commonParser';

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
      // const data = json.data;
      const data = GOOGLEPLAY_WATCHA_RECEIPT.data;

      let id = null;
      let snippet = null;
      let subject = null;
      let from = null;
      let bodyText = null;

      id = data.id;
      snippet = data.snippet;

      data.payload.headers.some((headers) => {
        const name = headers.name.toLowerCase();

        switch (name) {
          case 'from':
            from = headers.value;
            break;
          case 'subject':
            subject = headers.value;
            break;
        }

        if ((from !== null) && (subject !== null))
          return false;
      });

      bodyText = CommonParser.base64ToUtf8(data.payload.parts[0].body.data);

      const iframeBody = data.payload.parts[1].body.data;

      dto.setId(id);
      dto.setSnippet(snippet);
      dto.setSubject(subject);
      dto.setFrom(from);
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
    }
  };
})();

export default GooglePlayReceiptParser;
