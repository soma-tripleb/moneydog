import express from 'express';
const router = express.Router();

import GoogleOAuth from '../../util/googleOAuth';
import OAuthService from '../../service/oauthService';

router.get('/', (req, res) => {
  console.log('google oauth');

  const OAuth2Client = new GoogleOAuth();

  res.redirect(OAuth2Client.url());
});

router.get('/certificate', async (req, res) => {
  const code = req.query.code;

  try {
    const result = await OAuthService.userRegister(code);

    res.send({
      code: code,
      messages: {
        result
      }
    });

  } catch (err) {
    res.json({
      message: err.message,
      error: err,
    });
  }
});

export default router;