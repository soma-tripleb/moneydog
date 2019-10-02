const cheerio = require('cheerio');
const commonParser = require('../commonParser');
const moment = require('moment');

const getSubject = (response) => {
  const subject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[18];
  return subject;
};

const checkStatus = (response) => {
  if (getSubject(response).contains('작별')) {
    // update unsubsribe method
  } else if (getSubject(response).contains('업데이트')) {
    // membership upgrade
  } else {
    // membership restart or using
  }
}

const getNetflixInfo = (response) => {
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  const $ = cheerio.load(dom);
  service = {};
  service.email = $('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(8) > td > table > tbody > tr:nth-child(2) > td').text();
  service.name = convertNameReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text());
  service.price = convertPriceReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text());
  service.renewal = convertRenewalReg($('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(1) > td').text().trim());
  service.periodMonth = 1;
  service.nextSubsribe = true;
  return service;
};

// extract service name
const convertNameReg = (data) => {
  const regex = /[가-힣]{3,4}/;
  return regex.exec(data)[0];
};

// extract service price
const convertPriceReg = (data) => {
  const priceRegex = /[0-9]{2},[0-9]{3}/;
  return parseInt(priceRegex.exec(data)[0].replace(',', ''));
};

// extract and calculate renewal date
const convertRenewalReg = (data) => {
  const yearRegex = /[0-9]{4}/;
  const monthRegex = /[0-9]{2}/g;
  const monthAndDay = data.match(monthRegex); // return 4 values [20,19,10,31] => 2019-10-31.
  const fullDay = `${yearRegex.exec(data)[0]}${monthAndDay[2]}${monthAndDay[3]}`;
  return moment(fullDay).format('YYYY-MM-DD'); // return 2019-10-31
};

const fs = require('fs');
const response = fs.readFileSync('./netflix_unsubscribe.json');

console.log(getSubject(response));
