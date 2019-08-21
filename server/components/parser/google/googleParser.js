const cheerio = require('cheerio');
const commonParser = require('../commonParser');

const getGoolgeInfo = (response) => {
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.fromEmail = getFromEmail(response);
  service.email = commonParser.getEmailId(response);
  service.name = convertNameReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span').text().trim());
  service.price = convertPriceReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(2) > span').text());
  service.date = convertDateReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(5)').text());
  service.renewal = convertRenewalReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)').text());
  service.periodMonth = calPeriod(service.renewal, service.date);
  return service;
}

const getFromEmail = (response) => {
  return fromEmailReg(commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[23].value);
}

const convertPriceReg = (price) => {
  const priceReg = /\₩(.*?)\n/;
  return parseInt(priceReg.exec(price)[1].replace(',', ''));
}

const convertDateReg = (date) => {
  const dateReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return dateReg.exec(date)[0];
}

const convertNameReg = (name) => {
  const nameReg = /\(([^)]+)\)/;
  return nameReg.exec(name)[1];
}

const convertRenewalReg = (renewal) => {
  const renewalReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return renewalReg.exec(renewal)[0];
}

const fromEmailReg = (fromEmail) => {
  const emailReg = /<(.*?)>/;
  return emailReg.exec(fromEmail)[1];
}

const calPeriod = (date, renewal) => {
  return Math.floor(Math.abs(new Date(renewal) - new Date(date)) / (1000*60*60*24*30));
}


module.exports = {
  getGoolgeInfo: getGoolgeInfo,
  getFromEmail: getFromEmail,
}
