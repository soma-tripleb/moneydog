const commonParser = require('../commonParser');
const fs = require('fs');
const response = fs.readFileSync('./watcha_renewal.json');


const getWathcaInfo = (response) => {
  const $ = commonParser.getParser(response);
  service = {};
  service.paymentDate = paymentDateRegex($('body > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div:nth-child(2) > p > span:nth-child(1)').text());
  service.price = priceRegex($('body > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div:nth-child(2) > p > span:nth-child(5)').text());
  service.renewalDate = renewalDateRegex($('body > div > div > div:nth-child(4) > div > div:nth-child(5) > div > div:nth-child(2) > p > span:nth-child(7)').text());
  console.log(service);
};

const paymentDateRegex = (paymentDate) => {
  const regex = /[0-9]{3,4}-[0-9]{1,2}-[0-9]{1,2}/;
  return regex.exec(paymentDate)[0];
};

const priceRegex = (price) => {
  const regex = /[0-9]{1,2},[0-9]{3}/;
  return parseInt(regex.exec(price)[0].replace(',', ''));
};

const renewalDateRegex = (renewalDate) => {
  const regex = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/;
  return regex.exec(renewalDate)[0];
};

getWathcaInfo(response);
