import express from 'express';
const router = express.Router();

import GooglePlayParser from '../../../../util/parser/email/googleplay/googleplayParser';

const wrapper = (asyncFn) => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
};

router.get('/receipt', wrapper(async (req, res) => {
  const result = GooglePlayParser.bodyParser();

  res.send(result);
}));

export default router;