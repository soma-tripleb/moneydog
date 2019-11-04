import express from 'express';
const router = express.Router();

import GooglePlayService from '../../../../service/googleplayService';

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
  const useremail = req.query.useremail;

  const result = await GooglePlayService.parse(useremail);

  res.send(result);
}));

export default router;