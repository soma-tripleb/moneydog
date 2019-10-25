import CommonParser from '../commonParser';
import cheerio from 'cheerio';

const PRICE_TAG = 'body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span';

const DATE_TAG = 'body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td';

const AppleReceiptParser = (() => {
  return {
    metadataParse: async (json, dto, callback) => {

      const data = json.data;

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

      name = $('span[class=title]').contents().get('0').data;

      price = convertPrice($(PRICE_TAG).text());

      date = convertDateReg($(DATE_TAG).text());

      renewal = convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim());

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

const convertPrice = (price) => {
  return parseInt(price.replace('￦', '').replace(',', ''));
};

const convertDateReg = (date) => {
  const dateReg = /\d{4}.\d{1,2}.\d{1,2}/;
  return dateReg.exec(date)[0];
};

const calPeriod = (date, renewal) => {
  return Math.floor(Math.abs(new Date(renewal) - new Date(date)) / (1000 * 60 * 60 * 24 * 30));
};

const convertRenewalReg = (renewal) => {
  const renewalReg = /\d{4}.\d{1,2}.\d{1,2}/;

  return renewalReg.exec(renewal)[0];
};

export default AppleReceiptParser;
