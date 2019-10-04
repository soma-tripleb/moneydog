import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import GoogleOAuthApi from '../../../util/google/googleOAuthApi';

const router = express.Router();

router.get('/oauth', (req, res) => {
  console.log('GOOGLE OAUTH');

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
  console.log('GOOGLE SIGNUP');

  const token = await GoogleOAuthApi.getToken(req.query.code);

  res.send(JSON.stringify(token));
});

export default router;