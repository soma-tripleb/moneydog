const DomParser = require('dom-parser');
const cheerio = require('cheerio');
const fs = require('fs');

const getAppleInfo = (response) => {
  const jsonObject = stringToJsonObject(base64ToUtf8(response));
  const dom = convertHtml(base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.fromEmail = getFromEmail(response);
  service.email = getEmailId(response);
  service.name = $('span[class=title]').contents().get('0').data;
  service.date = convertDateReg($('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text())
  service.renewal = convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim());
  service.periodMonth = calPeriod(service.renewal, service.date);
  console.log(service);
  return service;
}

const getEmailId = (response) => {
  return stringToJsonObject(base64ToUtf8(response)).payload.headers[0].value;
}

const getFromEmail = (response) => {
  return fromEmailReg(stringToJsonObject(base64ToUtf8(response)).payload.headers[13].value);
}

const base64ToUtf8 = (base64encoded) => {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
}

const stringToJsonObject = (decodedResponse) => {
  return JSON.parse(decodedResponse);
}

const convertHtml = (rawHtml) => {
  const parser = new DomParser();
  const wrapper = parser.parseFromString(rawHtml, 'text/html');
  return wrapper.rawHTML;
}

const convertRenewalReg = (renewal) => {
  const renewalReg = /\d{4}.\d{1,2}.\d{1,2}/;
  return renewalReg.exec(renewal)[0];
}

const convertDateReg = (date) => {
  const dateReg = /\d{4}.\d{1,2}.\d{1,2}/;
  return dateReg.exec(date)[0];
}

const calPeriod = (date, renewal) => {
  return Math.floor(Math.abs(new Date(renewal) - new Date(date)) / (1000*60*60*24*30));
}

const fromEmailReg = (fromEmail) => {
  const emailReg = /<(.*?)>/;
  return emailReg.exec(fromEmail)[1];
}

const response = fs.readFileSync('./youtubeReceipt.json');

getAppleInfo(response);
