import express from 'express';
const router = express.Router();

import mongoDB from '../../config/mongo/db';
import { google } from 'googleapis';

router.get('/refresh_token', async (req, res) => {
  const email = 'qwer@fkii.org';

  const refreshToken = await mongoDB.client()
    .then((client) => {
      const db = client.db('dev');
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