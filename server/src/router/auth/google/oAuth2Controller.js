import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import GoogleOAuthApi from '../../../util/google/googleOAuthApi';

const router = express.Router();
// const GoogleOAuth = new GoogleOAuthApi();

router.post('/oauth', (req, res) => {
  console.log(req.body);

  if (typeof req.body != 'undefined') res.send('get google oauth code');
  else res.send('not found');
});

export default router;
