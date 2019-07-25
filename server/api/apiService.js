const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.resolve(__dirname, '../env/token.json');
const CREDENTIALS_PATH = path.resolve(__dirname, '../env/credentials.json');
const TEST_USERID='jimmyjaeyeon@gmail.com';

fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), getList);
});

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

function getList(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.list({userId: TEST_USERID}, (err, res) => {
      err ? reject(err) : resolve(res.data.messages);
    });
  });
}

function getMessage(auth, id) {
  console.log('called printMessage method');
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.get({auth: auth, userId: TEST_USERID, id: id,}, (err, res) => {
      err ? reject(err) : resolve(base64ToUtf8(res.data.payload.parts[0].body.data));
    });
  });
}

function base64ToUtf8(base64encoded) {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
}

module.exports = {
  getCredentials: getCredentials,
  authorize: authorize,
  getList: getList,
  getMessage: getMessage,
}
