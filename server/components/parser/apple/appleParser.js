const cheerio = require('cheerio');
const commonParser = require('../commonParser');

const getAppleInfo = (response) => {
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.fromEmail = getFromEmail(response);
  service.email = commonParser.getEmailId(response);
  service.name = $('span[class=title]').contents().get('0').data;
  service.price = convertPrice($('body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span').text());
  service.date = convertDateReg($('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text());
  service.renewal = convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim());
  service.periodMonth = calPeriod(service.renewal, service.date);
  return service;
};

const getFromEmail = (response) => {
  return fromEmailReg(commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[13].value);
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
  return Math.floor(Math.abs(new Date(renewal) - new Date(date)) / (1000*60*60*24*30));
};

const fromEmailReg = (fromEmail) => {
  const emailReg = /<(.*?)>/;
  return emailReg.exec(fromEmail)[1];
};

module.exports = {
  getAppleInfo: getAppleInfo,
  getFromEmail: getFromEmail,
};
