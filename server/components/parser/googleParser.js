const DomParser = require('dom-parser');
const cheerio = require('cheerio');
const fs = require('fs');

const getGoolgeInfo = (response) => {
  const jsonObject = stringToJsonObject(base64ToUtf8(response));
  const dom = convertHtml(base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.email = getEmailId(response);
  // service.name = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span').text().trim();
  // service.date = $('#gamma > div > div:nth-child(2) > div > div:nth-child(5)').text().split('주문 날짜:')[1].trim();
  // service.renewal = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)').text().split(':')[1].trim();
  service.name = nameReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span').text().trim());
  service.date = dateReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(5)').text());
  service.renewal = durationReg($('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)').text());
  console.log(service);
  return service;
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

const getEmailId = (jsonObject) => {
  return stringToJsonObject(base64ToUtf8(jsonObject)).payload.headers[0].value;
}

const dateReg = (date) => {
  const dateReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return dateReg.exec(date)[0];
}

const nameReg = (name) => {
  const nameReg = /\(([^)]+)\)/;
  return nameReg.exec(name)[1];
}

const durationReg = (duration) => {
  const durationReg = /\d{4}\.\s\d{1,2}\.\s\d{1,2}/g;
  return durationReg.exec(duration)[0];
}

module.exports = {
  getGoolgeInfo: getGoolgeInfo,
}

const response = fs.readFileSync('./gmail_response.json');
getGoolgeInfo(response);
