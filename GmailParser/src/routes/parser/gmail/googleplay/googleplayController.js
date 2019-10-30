import express from 'express';
const router = express.Router();

import GooglePlayParser from '../../../../util/parser/email/googleplay/googleplayParser';
import GooglePlay from '../../../../model/dto/googleplay';

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
  const GooglePlayDTO = new GooglePlay();

  const result = await GooglePlayParser.metadataParse('asd', GooglePlayDTO, GooglePlayParser.iframeParse);

  res.send(result);
}));

export default router;