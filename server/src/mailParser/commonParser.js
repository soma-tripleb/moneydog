const DomParser = require('dom-parser');

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
  }
  return 'google';
};

module.exports = {
  base64ToUtf8: base64ToUtf8,
  stringToJsonObject: stringToJsonObject,
  convertHtml: convertHtml,
  getEmailId: getEmailId,
  checkDomain: checkDomain,
};
