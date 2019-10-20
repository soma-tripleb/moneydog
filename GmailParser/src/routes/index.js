import express from 'express';
const router = express.Router();

import mongoDB from '../config/mongo/db';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Hello Gmail Parser');
});

router.delete('/delete/:info', async (req, res, next) => {
  const DB_ENV = (() => {
    return (process.env.NODE_ENV === undefined) ? 'test' : process.env.NODE_ENV;
  })();

  const info = req.params.info;

  console.log(info);

  try {
    const client = await mongoDB.client();
    const db = client.db(DB_ENV);

    const result = await db.collection('users').deleteOne({username: info});

    res.send({
      result,
    });

  } catch (err) {
    throw err;
  }
});

module.exports = router;
