import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

// const authorize()
const authorize = (token) => {
  const { GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URL } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URL
  );

  oAuth2Client.setCredentials(token);

  return oAuth2Client;
};

const getToken = (code) => {
  const { GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URL } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URL
  );

  return oAuth2Client.getToken(code);
};

const listLabels = (auth) => {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'dudrnxps1@gmail.com',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
};

export default {
  authorize,
  getToken,
  listLabels,
};
