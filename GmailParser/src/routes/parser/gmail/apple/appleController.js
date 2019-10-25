import express from 'express';
const router = express.Router();

import AppleService from '../../../../service/appleService';

const wrapper = (asyncFn) => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
};

// from:(apple) subject:(영수증)
router.get('/receipt', wrapper(async (req, res) => {
  // TODO, query 검증
  const useremail = req.query.useremail;

  const result = await AppleService.parse(useremail);

  res.send({ useremail, result });
}));

export default router;