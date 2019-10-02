const cheerio = require('cheerio');
const commonParser = require('../commonParser');

const getSubject = (response) => {
  const subject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[18];
  return subject;
};

const getNetflixInfo = (response) => {
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.email = $('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(8) > td > table > tbody > tr:nth-child(2) > td').text();
  // service.name = convertNameReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span').text().trim());
  // service.price = convertPriceReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(2) > span').text());
  // service.date = convertDateReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(5)').text());
  // service.renewal = convertRenewalReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)').text());
  // service.periodMonth = calPeriod(service.renewal, service.date);
  console.log(`service : ${service.fromEmail}`);
  console.log(`regex : ${namePriceReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text())}`)
  return service;
};

const namePriceReg = (data) => {
  console.log(`input data : ${data}`);
  const regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*/gi;
  return regexp.match(data);
};

const fs = require('fs');
const response = fs.readFileSync('./netflix_membership_signup.json');
console.log(getNetflixInfo(response));
