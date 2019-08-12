const DomParser = require('dom-parser');
const cheerio = require('cheerio');

const getGoolgeInfo = (response) => {
  const jsonObject = stringToJsonObject(base64ToUtf8(response));
  const dom = convertHtml(base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.email = getEmailId(response);
  service.name = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span').text().trim();
  service.date = $('#gamma > div > div:nth-child(2) > div > div:nth-child(5)').text().split('주문 날짜:')[1].trim();
  service.renewal = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)').text().split(':')[1].trim();
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

module.exports = {
  getGoolgeInfo: getGoolgeInfo,
}
