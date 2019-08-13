const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path');
const cheerio = require('cheerio');
const DomParser = require('dom-parser');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.resolve(__dirname, '../env/token.json');
const CREDENTIALS_PATH = path.resolve(__dirname, '../env/credentials.json');
const TEST_USERID = 'jimmyjaeyeon@gmail.com';
const APPLE_EMAIL = 'no_reply@email.apple.com';

fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading root secret file:', err);
  authorize(JSON.parse(content), getList);
});

function getList(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.list({userId: TEST_USERID, q: `from:Apple subject:영수증 -(구독 만료) -(구독 확인) "갱신 예정"`}, (err, res) => {
      err ? reject(err) : resolve(res.data.messages);
    });
  });
}

function getMessage(auth, id) {
  // id = 16c3b300da121d9c
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.get({auth: auth, userId: TEST_USERID, id: id,}, (err, res) => {
      err ? reject(err) : resolve(base64ToUtf8(res.data.payload.parts[1].body.data));
    });
  });
}

function getReceipt(auth, id) {
  // id = 16c3b300da121d9c
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.get({auth: auth, userId: TEST_USERID, id: id,}, (err, res) => {
      err ? reject(err) : resolve(getInfo(base64ToUtf8(res.data.payload.parts[1].body.data)));
    });
  });
}

async function infos(auth) {
  const messages = await getList(auth);
  return await Promise.all(messages.map(message => getReceipt(auth, message.id)))
}

function getInfo(rawHtml) {
  console.log(convertHtml(rawHtml));
  const $ = cheerio.load(convertHtml(rawHtml));
  service = {};
  service.email = $('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(1)').text().split('ID')[1];
  service.name = $('span[class=title]').contents().get('0').data;
  service.date = $('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text().split('날짜')[1];
  service.duration = $('span[class=duration]').contents().get('0').data;
  service.renewal = $('span[class=renewal]').contents().get('0').data.trim();
  return service;
}

function checkSubject(auth, id) {
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.get({auth: auth, userId: TEST_USERID, id: id,}, (err, res) => {
      err ? reject(err) : resolve(res.data.payload.headers[16].value);
    });
  });
}

function base64ToUtf8(base64encoded) {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
}

function convertHtml(rawHtml) {
  const parser = new DomParser();
  const wrapper = parser.parseFromString(rawHtml, 'text/html');
  return wrapper.rawHTML;
}

function getCredentials() {
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
      });
      callback(oAuth2Client);
    });
  });
}

module.exports = {
  getCredentials: getCredentials,
  authorize: authorize,
  getList: getList,
  getMessage: getMessage,
  getReceipt: getReceipt,
  checkSubject: checkSubject,
  infos: infos,
}
