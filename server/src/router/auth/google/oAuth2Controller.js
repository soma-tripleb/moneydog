import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import GoogleOAuthApi from '../../../util/google/googleOAuthApi';

import { google } from 'googleapis';

const router = express.Router();
let oauth2Client;

router.get('/oauth', (req, res) => {
  const oauthUrl = process.env.GOOGLE_API_OAUTH_URL;
  const redirectUri = process.env.GOOGLE_API_REDIRECT_URL_ENCODE;
  const clientId = process.env.GOOGLE_API_CLIENT_ID;

  const googleOAuthLoginUrl = oauthUrl
    .concat('?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly')
    .concat('&access_type=offline')
    .concat('&include_granted_scopes=true')
    .concat('&state=state_parameter_passthrough_value')
    .concat('&redirect_uri=').concat(redirectUri)
    .concat('&response_type=code')
    .concat('&client_id=').concat(clientId);

  res.redirect(googleOAuthLoginUrl);
});

router.get('/signup', async (req, res) => {
  // const token = await GoogleOAuthApi.getToken(req.query.code);

  const {tokens} = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });


  const gmail = await google.gmail({version: 'v1', auth: oauth2Client});

  // gmail.users.labels.list({userId: 'dudrnxps1@gmail.com'})
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });

  const result = await gmail.users.messages.list({userId: 'dudrnxps1@gmail.com'});

  res.send(result);
});

router.get('/api', (erq, res) => {
  oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_API_CLIENT_ID,
    process.env.GOOGLE_API_CLIENT_SECRET,
    process.env.GOOGLE_API_REDIRECT_URL,
  );
   
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
  ];
   
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
   
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  res.redirect(url);
});

export default router;