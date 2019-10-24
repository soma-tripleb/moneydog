import express from 'express';
const router = express.Router();

import GmailService from '../../../service/gmailService';
import Query from '../../../model/query';

const wrapper = (asyncFn) => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
};

router.get('/messages/id', async (req, res) => {
  const useremail = req.query.useremail;

  try {
    const result = await GmailService.userMessagesId(useremail);

    res.send({
      result,
    });
  } catch (err) {
    throw err;
  };

});

router.get('/messages', async (req, res) => {
  const useremail = req.query.useremail;

  try {
    const result = await GmailService.userMessages(useremail);

    res.send({
      result
    });

  } catch (err) {
    throw err;
  };

});

router.get('/messages/parsing', wrapper(async (req, res) => {
  // TODO, query 검증
  const useremail = req.query.useremail;
  const from = (req.query.from === undefined) ? '' : req.query.from;
  const subject = (req.query.subject === undefined) ? '' : req.query.subject;

  const SearchQuery = new Query(from, subject);
  const q = SearchQuery.queryMaker();

  const result = await GmailService.messagesParse(useremail, q);
  const count = result.length;

  const config = {
    useremail,
    'search-query': {
      query: q,
      from,
      subject,
    },
    'data': {
      count,
      result,
    }
  };

  res.send(config);
}));

export default router;