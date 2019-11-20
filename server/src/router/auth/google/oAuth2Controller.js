import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { google } from 'googleapis';
import OAuth2Repository from 'src/router/auth/google/oAuth2Repository';

const WORKER_BASE_URL = `${process.env.WORKER_BASE_URL}`;
const RESOURCE_URI = `${process.env.RESOURCE_URI}`;

const router = express.Router();

const gmailParsingJob = (useremail) => {
  console.log('Google OAuth 인증 End');
  axios({
    method: 'post',
    baseURL: WORKER_BASE_URL,
    url: RESOURCE_URI,
    data: {
      useremail: useremail
    }
  });
};

router.post('/oauth', async (req, res) => {
  console.log('Google OAuth 인증 Start');

  let code;

  if (typeof req.body.code != 'undefined') {
    code = req.body.code;
  } else res.send('not found').end();

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_API_CLIENT_ID,
    process.env.GOOGLE_API_CLIENT_SECRET,
    process.env.GOOGLE_API_REDIRECT_URL
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const profile = await google.oauth2('v2').userinfo.v2.me.get({ auth: oauth2Client });
    const useremail = profile.data.email;

    if (typeof tokens.refresh_token != 'undefined') {
      const refreshToken = tokens.refresh_token;

      // insert refresh_token
      const updateResult = await OAuth2Repository.updateRefreshToken(useremail, refreshToken);

      console.log({
        updateResult
      });

      // worker
      gmailParsingJob(useremail);

      // TODO, response 에 사용자 인증 'code' 노출 방지
      res.send({
        data: 'Get users refresh token'
      }).end();

    } else {
      throw new Error('ALREADY_SIGN_UP_USER');
    }
  } catch (err) {
    throw err;
  }
});

router.post('/worker/listener', (req, res) => {
  // const useremail = req.body.useremail;
  // const parsingResult = req.body.insertResult;

  console.log(req.body);
  // if (parsingResult.n == 1 && parsingResult.nModified && parsingResult.ok == 1) {
  // };
  console.log(useremail, ' Parsing success');
});

export default router;
