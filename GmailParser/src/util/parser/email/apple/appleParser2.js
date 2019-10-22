import CommonParser from '../commonParser';
import cheerio from 'cheerio';

const PRICE_TAG = 'body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span';

const DATE_TAG = 'body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td';

const metadataParse = async (json, appleReceiptForm, callback) => {

  const data = json.data;

  appleReceiptForm.setId(data.id);
  appleReceiptForm.setSnippet(data.snippet);

  data.payload.headers.some((headers) => {
    const name = headers.name.toLowerCase();
    switch (name) {
      case 'date':
        appleReceiptForm.setDate(headers.value);

        break;
      case 'from':
        appleReceiptForm.setFrom(headers.value);

        break;
      case 'subject':
        appleReceiptForm.setSubject(headers.value);

        break;
    }

    if ((appleReceiptForm.date !== null) && (appleReceiptForm.form !== null) &&
      (appleReceiptForm.subject !== null)) return false;
  });

  const iframeBody = data.payload.parts[1].body.data;

  return await callback(appleReceiptForm, iframeBody);
};

const iframeParse = (appleReceiptForm, iframeBody) => {
  const body = iframeBody;

  const bodyDecoded = CommonParser.base64ToUtf8(body);
  const dom = CommonParser.convertHtml(bodyDecoded);

  const $ = cheerio.load(dom);

  // console.log('name: ', $('span[class=title]').contents().get('0').data);
  appleReceiptForm.setName($('span[class=title]').contents().get('0').data);

  // console.log('price: ', convertPrice($(PRICE_TAG).text()));
  appleReceiptForm.setPrice(convertPrice($(PRICE_TAG).text()));

  // console.log('date: ', convertDateReg($(DATE_TAG).text()));
  appleReceiptForm.setDate(convertDateReg($(DATE_TAG).text()));

  return appleReceiptForm;
};

const convertPrice = (price) => {
  return parseInt(price.replace('￦', '').replace(',', ''));
};

const convertDateReg = (date) => {
  const dateReg = /\d{4}.\d{1,2}.\d{1,2}/;
  return dateReg.exec(date)[0];
};

export default {
  metadataParse,
  iframeParse
};
