import cheerio from 'cheerio';
import CommonParser from '../commonParser';

const getAppleInfo = (response, appleReceiptForm) => {
  // const jsonObject = CommonParser.stringToJsonObject(CommonParser.base64ToUtf8(response));
  const jsonObject = response;

  appleReceiptForm.setId(jsonObject.id);
  appleReceiptForm.setSnippet(jsonObject.snippet);

  jsonObject.payload.headers.map((item) => {
    if (item.name === 'X-Google-Smtp-Source') {
      appleReceiptForm.setSmtp(item.value);
    }

    if (item.name === 'Subject') {
      appleReceiptForm.setSubject(item.value);
    }
  });

  const dom = CommonParser.convertHtml(CommonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));

  const $ = cheerio.load(dom);

  appleReceiptForm.setFrom(getFromEmail(response));
  appleReceiptForm.setName($('span[class=title]').contents().get('0').data);

  appleReceiptForm.setPrice(convertPrice($('body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span').text()));

  appleReceiptForm.setDate(convertDateReg($('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text()));

  appleReceiptForm.setRenewal(convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim()));

  appleReceiptForm.setPeriodMonth(calPeriod(appleReceiptForm.renewal, appleReceiptForm.date));

  return appleReceiptForm;
};
// const getAppleInfo = (response) => {
//   const jsonObject = CommonParser.stringToJsonObject(CommonParser.base64ToUtf8(response));

//   // console.log(jsonObject.id);
//   // console.log(jsonObject.snippet);
//   jsonObject.payload.headers.map((item) => {
//     if (item.name === 'X-Google-Smtp-Source') {
//       console.log(item.name, ': ', item.value);
//     }

//     if (item.name === 'Subject') {
//       console.log(item.name, ': ', item.value);
//     }
//   });


//   const dom = CommonParser.convertHtml(CommonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));

//   const $ = cheerio.load(dom);

//   const service = {};

//   service.fromEmail = getFromEmail(response);
//   service.email = CommonParser.getEmailId(response);
//   service.name = $('span[class=title]').contents().get('0').data;
//   service.price = convertPrice($('body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span').text());
//   service.date = convertDateReg($('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text());
//   service.renewal = convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim());
//   service.periodMonth = calPeriod(service.renewal, service.date);

//   return service;
// };

const getFromEmail = (response) => {
  return fromEmailReg(CommonParser.stringToJsonObject(CommonParser.base64ToUtf8(response)).payload.headers[13].value);
};

const convertPrice = (price) => {
  return parseInt(price.replace('￦', '').replace(',', ''));
};

const convertRenewalReg = (renewal) => {
  const renewalReg = /\d{4}.\d{1,2}.\d{1,2}/;

  return renewalReg.exec(renewal)[0];
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

module.exports = {
  getAppleInfo,
  getFromEmail,
};
