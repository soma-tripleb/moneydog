import express from 'express';
const router = express.Router();

import GoogleOAuth from '../../util/googleOAuth';
import GoogleService from '../../service/googleService';

router.get('/', (req, res) => {
  const OAuth2Client = new GoogleOAuth();

  res.redirect(OAuth2Client.url());
});

router.get('/certificate', async (req, res) => {
  const code = req.query.code;

  try {
    const result = await GoogleService.userRegister(code);

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