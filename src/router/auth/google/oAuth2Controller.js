import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

import GoogleOAuthApi from '../../../util/google/googleOAuthApi';

const router = express.Router();

// api info
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
let accessToken;

const authorize = async () => {
  const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET;
  const REDIRECT_URL = process.env.GOOGLE_API_REDIRECT_URL;

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  if (accessToken === undefined) {
    return await getNewToken(oAuth2Client);
  } else {
    oAuth2Client.setCredentials(accessToken);
    return oAuth2Client;
  }
};

const getNewToken = (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl(
    {
      access_type: 'offline',
      scope: SCOPES,
    }
  );

  console.log('Authorize this app by visiting this url:', authUrl);

  oAuth2Client.getToken((err, token) => {
    if (err) return console.log('Error retrieving access token', err);
    console.log(token);

    return oAuth2Client.setCredential(token);
  });


};

const getToken = async (code) => {
  const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET;
  const REDIRECT_URL = process.env.GOOGLE_API_REDIRECT_URL;

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  // const authUrl = oAuth2Client.generateAuthUrl(
  //   {
  //     access_type: 'offline',
  //     scope: SCOPES,
  //   }
  // );

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log(token.access_token);

    oAuth2Client.setCredentials(token.access_token);

    const auth = oAuth2Client;

    const gmail = google.gmail(
      {
        version: 'v1',
        auth,
      }
    );
    
    gmail.users.labels.list(
      {
        userId: 'dudrnxps1@gmail.com',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data.labels);
      });
    // const gmail = google.gmail({version: 'v1', auth});

    // gmail.users.labels.list({
    //   userId: 'me',
    // }, (err, res) => {
    //   if (err) return console.log('The API returned an error: ' + err);
  
    //   const labels = res.data.labels;
    //   if (labels.length) {
    //     console.log('Labels:');
    //     labels.forEach((label) => {
    //       console.log(`- ${label.name}`);
    //     });
    //   } else {
    //     console.log('No labels found.');
    //   }
    // });
  });
};

const listLabels = (auth) => {
  const gmail = google.gmail({version: 'v1', auth});

  gmail.users.labels.list({
    userId: 'me',
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

    return labels;
  });
};

router.get('/oauth', (req, res) => {
  console.log('GOOGLE OAUTH');
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&access_type=offline&
  include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fgoogle%2Fsignup&response_type=code&client_id=532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com`);
});

router.get('/signup', async (req, res) => {
  console.log('GOOGLE SIGNUP');

  const token = await GoogleOAuthApi.getToken(req.query.code);

  console.log(token);
  const auth = GoogleOAuthApi.authorize(token.tokens.access_token);

  console.log(auth);
  GoogleOAuthApi.listLabels(auth);

  res.send('success');
});

export default router;