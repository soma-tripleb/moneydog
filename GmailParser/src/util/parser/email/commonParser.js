import DomParser from 'dom-parser';
import cheerio from 'cheerio';
import moment from 'moment';

const base64ToUtf8 = (base64encoded) => {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
};

const stringToJsonObject = (decodedResponse) => {
  return JSON.parse(decodedResponse);
};

const convertHtml = (rawHtml) => {
  const parser = new DomParser();
  const wrapper = parser.parseFromString(rawHtml, 'text/html');
  return wrapper.rawHTML;
};

const getEmailId = (jsonObject) => {
  return stringToJsonObject(base64ToUtf8(jsonObject)).payload.headers[0].value;
};

const getDomain = (response) => {
  let domain;
  const headers = stringToJsonObject(base64ToUtf8(response)).payload.headers;
  headers.map((header) => {
    if (header.name === 'From') {
      domain = header.value;
    }
  });
  return domain;
};

const checkDomain = (response) => {
  if (getDomain(response).indexOf('apple') != -1) {
    return 'apple';
  } else if (getDomain(response).indexOf('netflix') != -1) {
    return 'netflix';
  } else if (getDomain(response).indexOf('watcha') != -1) {
    return 'watcha';
  }
  return 'google';
};

const getParser = (response) => {
  const jsonObject = stringToJsonObject(base64ToUtf8(response));
  const dom = convertHtml(base64ToUtf8(jsonObject.payload.parts[1].body.data));
  return cheerio.load(dom);
};

const getReceivedDate = (response) => {
  const receivedDate = stringToJsonObject(base64ToUtf8(response)).payload.headers[1];
  return mailReceivedDateRegex(receivedDate.value);
};

const mailReceivedDateRegex = (receivedDate) => {
  const regex = /[a-zA-Z]{3},\s[0-9]{1,2}\s[a-zA-Z]{3}\s[0-9]{4}\s[0-9: -]*/;
  return moment(regex.exec(receivedDate)[0]).format('YYYY-MM-DD');
};

const replaceAll = (str, searchStr, replaceStr) => {
  return str.split(searchStr).join(replaceStr);
};

export default {
  base64ToUtf8,
  stringToJsonObject,
  convertHtml,
  getEmailId,
  checkDomain,
  getParser,
  getReceivedDate,
  replaceAll,
};
