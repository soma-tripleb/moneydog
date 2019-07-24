const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.resolve(__dirname, '../../env/token.json');
const CREDENTIALS_PATH = path.resolve(__dirname, '../../env/credentials.json');

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
  console.log('토큰 재발급 필요함');
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
  console.log('getList 호출');
  const gmail = google.gmail({version: 'v1', auth});
  return new Promise((resolve, reject) => {
    gmail.users.messages.list({
      userId: 'jimmyjaeyeon@gmail.com',
    }, (err, res) => {
      err ? reject(err) : resolve(res.data.messages);
    });
  });
}

function printMessage(auth) {
  console.log('called printMessage method');
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.get({
    auth: auth,
    userId: 'jimmyjaeyeon@gmail.com',
    id: '16bc851654817e8a',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messages = res;
    console.log(messages);
  })
}

// module.exports = 'ApiService';
module.exports = {
  getCredentials: getCredentials,
  authorize: authorize,
  getList: getList,
}
