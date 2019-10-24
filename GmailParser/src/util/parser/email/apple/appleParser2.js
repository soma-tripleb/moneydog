import CommonParser from '../commonParser';
import cheerio from 'cheerio';

const PRICE_TAG = 'body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span';

const DATE_TAG = 'body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td';

const metadataParse = async (json, dto, callback) => {

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
};

const metadataParse2 = (json, dto) => {

  const data = json.data;

  dto.setId(data.id);
  dto.setSnippet(data.snippet);

  data.payload.headers.some((headers) => {
    const name = headers.name.toLowerCase();
    switch (name) {
      case 'date':
        dto.setDate(headers.value);

        break;
      case 'from':
        dto.setFrom(headers.value);

        break;
      case 'subject':
        dto.setSubject(headers.value);

        break;
    }

    if ((dto.date !== null) && (dto.form !== null) &&
      (dto.subject !== null)) return false;
  });

  const iframeBody1 = data.payload.parts[0].body.data;
  const iframeBody2 = data.payload.parts[1].body.data;
  const bodyDecoded1 = CommonParser.base64ToUtf8(iframeBody1);
  const bodyDecoded2 = CommonParser.base64ToUtf8(iframeBody2);

  dto.setBody1(bodyDecoded1.replace(/\r\n/gi, ''));
  dto.setBody2(bodyDecoded2.replace(/\r\n/gi, ''));

  return dto;
};

const iframeParse = (dto, iframeBody) => {
  const body = iframeBody;

  let fromEmail = '';
  let name = '';
  let price = '';
  let date = '';
  let renewal = '';
  let periodMonth = '';

  const bodyDecoded = CommonParser.base64ToUtf8(body);
  const dom = CommonParser.convertHtml(bodyDecoded);

  const $ = cheerio.load(dom);

  fromEmail = getFromEmail(bodyDecoded);
  // console.log('name: ', $('span[class=title]').contents().get('0').data);
  name = $('span[class=title]').contents().get('0').data;

  // console.log('price: ', convertPrice($(PRICE_TAG).text()));
  price = convertPrice($(PRICE_TAG).text());

  console.log('date: ', convertDateReg($(DATE_TAG).text()));
  date = convertDateReg($(DATE_TAG).text());

  renewal = convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim());

  periodMonth = calPeriod(service.renewal, service.date);

  dto.setFromEmail(fromEmail);
  dto.setName(name);
  dto.setPrice(price);
  dto.setDate(date);
  dto.setRenewal(renewal);
  dto.setPeriodMonth(periodMonth);

  return appleReceiptForm;
};

const getFromEmail = (response) => {
  return fromEmailReg(CommonParser.stringToJsonObject(CommonParser.base64ToUtf8(response)).payload.headers[13].value);
};

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

const fromEmailReg = (fromEmail) => {
  const emailReg = /<(.*?)>/;

  return emailReg.exec(fromEmail)[1];
};

const convertRenewalReg = (renewal) => {
  const renewalReg = /\d{4}.\d{1,2}.\d{1,2}/;

  return renewalReg.exec(renewal)[0];
};

export default {
  metadataParse,
  metadataParse2,
  iframeParse
};
