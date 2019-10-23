const cheerio = require('cheerio');
const commonParser = require('../commonParser');
const moment = require('moment');

const checkStatus = (response) => {
  const subject = getNetflixEmailSubject(response).value;

  let service = {};

  if (subject.includes('작별')) {
    // update expiredDate and nextSubscribe true to false, 구독해지
    service = getExpiredDate(response);
  } else if (subject.includes('업데이트')) {
    // 멤버십 요금 변경
    service = getUpgradeInfo(response);
  } else if (subject.includes('가입')) {
    // 신규가입, 재가입
    service = getNetflixInfo(response);
  } else if (subject.includes('취향') || subject.includes('재시작')) {
    // 여기서 true는 구독사용에 대해서 true를 이야기한다.
    true;
  }
  // 취향, 재시작 이라는 단어가 있으면 넷플릭스를 현재 사용중.
  // update nextSubsribe true
  service.nextSubsribe = true;
  service.snippet = subject;

  return service;
};

const getNetflixEmailSubject = (response) => {
  const subject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[18];
  return subject;
};

// response를 DOM형태로 만들고, cheerio에 DOM을 로드
const getParser = (response) => {
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  return cheerio.load(dom);
};

// 구독해지할때, 해지예정일
const getExpiredDate = (response) => {
  const parser = getParser(response);
  const service = {};
  service.expiredDate = renewalAndExpiredRegex(parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(4) > td').text());
  return service;
};

// 멤버십 변경할때, 변경된 서비스의 이름, 가격 정보
const getUpgradeInfo = (response) => {
  const parser = getParser(response);
  const service = {};
  service.updatedName = parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td').text();
  service.updatedPrice = priceRegex(parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(8) > td > table > tbody > tr:nth-child(2) > td').text());
  return service;
};

// 신규가입과 재가입에 대한 결제정보
const getNetflixInfo = (response) => {
  const parser = getParser(response);
  const service = {};
  service.email = parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(8) > td > table > tbody > tr:nth-child(2) > td').text();
  service.name = nameRegex(parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text());
  service.price = priceRegex(parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(2) > td').text());
  service.renewal = renewalAndExpiredRegex(parser('#container > tbody > tr > td > table.shell > tbody > tr > td > table > tbody > tr:nth-child(11) > td > table > tbody > tr:nth-child(1) > td').text().trim());
  service.periodMonth = 1;
  service.nextSubsribe = true;
  return service;
};

// 서비스 이름을 정규표현식으로 추출
const nameRegex = (data) => {
  const regex = /[가-힣]{3,4}/;
  return regex.exec(data)[0];
};

// extract service price
const priceRegex = (data) => {
  const priceRegex = /[0-9]{2},[0-9]{3}/;
  return parseInt(priceRegex.exec(data)[0].replace(',', ''));
};

// extract and calculate renewal date
const renewalAndExpiredRegex = (data) => {
  const yearRegex = /[0-9]{4}/;
  const monthRegex = /[0-9]{2}/g;
  const monthAndDay = data.match(monthRegex); // return 4 values [20,19,10,31] => 2019-10-31.
  const fullDay = `${yearRegex.exec(data)[0]}${monthAndDay[2]}${monthAndDay[3]}`;
  return moment(fullDay).format('YYYY-MM-DD'); // return 2019-10-31
};

export default {
  checkStatus
};