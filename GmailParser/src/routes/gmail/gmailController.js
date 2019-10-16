import express from 'express';
const router = express.Router();

import mongoDB from '../../config/mongo/db';
import GmailApi from '../../util/gmailApi';

// import { google } from 'googleapis';

import GMAIL_SEARCH_QUERY from '../../resources/static/GmailSearchQuery.json';

router.get('/mail', async (req, res) => {
  const useremail = req.query.useremail;

  let refreshToken;
  let result;

  try {
    refreshToken = await GmailApi.getRefreshToken(useremail);
    result = await GmailApi.authorize(refreshToken, useremail, GMAIL_SEARCH_QUERY.APPLE, GmailApi.getMessages);
  } catch (err) {
    throw err;
  };

  result.map((mail) => {
    mail.then((result) => { console.log(result); });
  });
});

router.get('/refresh_token', async (req, res) => {
  const email = 'test@test.com';

  const refreshToken = await mongoDB.client()
    .then((client) => {
      const db = client.db('test');
      const collection = db.collection('users');

      return collection.findOne({ email: email })
        .then((result) => {
          res.send(result);

          return result.refreshToken;
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((err) => {
      throw err;
    });

  console.log(refreshToken);
});

export default router;