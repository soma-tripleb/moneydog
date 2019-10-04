const commonParser = require('../commonParser');
const moment = require('moment');

const fs = require('fs');
const response = fs.readFileSync('./watcha_renewal.json');

const checkStatus = (response) => {
  const subject = watchaEmailSubject(response);
  if (subject.includes('남은 7일')) {
    // 7일 뒤 해지할 예정.
    console.log(commonParser.mailReceivedDateRegex(response));
  } else if (subject.includes('갱신')) {
    getWathcaInfo(response);
  }
};

const getWathcaInfo = (response) => {
  const $ = commonParser.getParser(response);
  service = {};
  service.paymentDate = dateRegex($('body > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div:nth-child(2) > p > span:nth-child(1)').text());
  service.price = priceRegex($('body > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div:nth-child(2) > p > span:nth-child(5)').text());
  service.renewalDate = dateRegex($('body > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div:nth-child(2) > p > span:nth-child(7)').text());
  service.nextSubsribe = true;
  console.log(service);
  return service;
};

const watchaEmailSubject = (response) => {
  const subject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[21];
  return subject.value;
};

// 왓차는 해지 일주일전에 메일을 보낸다. 메일을 받은 날짜(ReceivedDate)를 구해서 일주일을 더해서 expiredDate를 구해야된다.


const dateRegex = (date) => {
  const yearRegex = /[0-9]{4}/;
  const monthRegex = /[0-9]{2}/g;
  const monthAndDay = date.match(monthRegex);
  const fullDay = `${yearRegex.exec(date)[0]}${monthAndDay[2]}${monthAndDay[3]}`;
  return moment(fullDay).format('YYYY-MM-DD');
};

const priceRegex = (price) => {
  const regex = /[0-9]{1,2},[0-9]{3}/;
  return parseInt(regex.exec(price)[0].replace(',', ''));
};

getWathcaInfo(response);
