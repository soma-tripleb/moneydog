const subscriptionRepository = require('./subscriptionRepository');
const cheerio = require('cheerio');
const fs = require('fs');
const DomParser = require('dom-parser');

const getSubscriptionList = () => {
  return subscriptionRepository.getSubscriptionList();
}

const getSubscriptionByName = (name) => {
  return subscriptionRepository.getSubscriptionByName(name);
}

const base64ToUtf8 = (base64encoded) => {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
}

const convertHtml = (rawHtml) => {
  const parser = new DomParser();
  const wrapper = parser.parseFromString(rawHtml, 'text/html');
  return wrapper.rawHTML;
}

const getAppleInfo = (rawHtml) => {
  const $ = cheerio.load(convertHtml(rawHtml));
  service = {};
  service.email = $('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(1)').text().split('ID')[1];
  service.name = $('span[class=title]').contents().get('0').data;
  service.date = $('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text().split('날짜')[1];
  service.duration = $('span[class=duration]').contents().get('0').data;
  service.renewal = $('span[class=renewal]').contents().get('0').data.trim();
  return service;
}

const getGoogleInfo = (rawHtml) => {
  const $ = cheerio.load(convertHtml(rawHtml));
  service = {};
  let name = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > span > span').text().trim();
  let renewal = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(1)').text().split(':')[1].trim();
  let price = $('#gamma > div > div:nth-child(2) > div > div:nth-child(6) > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(2) > span > span').text();
  let date = $('#gamma > div > div:nth-child(2) > div > div:nth-child(5)');
  console.log(name);
  // console.log(date);
  console.log(renewal);
  console.log(price);
}

module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscriptionByName: getSubscriptionByName,
};

const buf = JSON.parse(fs.readFileSync('./response.json'));

const base = buf.payload.parts[1].body.data;

getGoogleInfo(base64ToUtf8(base));