import express from 'express';

import GmailService from 'src/service/gmailService';

const router = express.Router();

const wrapper = (asyncFn) => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
};

router.get('/messages/id/:useremail', async (req, res) => {
  const useremail = req.params.useremail;

  try {
    const result = await GmailService.userMessagesId(useremail);

    res.json(result).end();
  } catch (err) {
    throw err;
  };

});

router.get('/messages', async (req, res) => {
  const useremail = req.query.useremail;
  const from = (req.query.from === undefined) ? '' : req.query.from;
  const hasTheWords = (req.query.hasTheWords === undefined) ? '' : req.query.hasTheWords;

  if (useremail == undefined) res.send('사용자 이메일을 입력하세요');

  const SearchQuery = new Query(from, hasTheWords);
  const q = SearchQuery.queryMaker();

  try {
    const result = await GmailService.userMessages(useremail, q);

    res.send({
      result
    });

  } catch (err) {
    throw err;
  };

});

router.get('/messages/parsing', wrapper(async (req, res) => {
  const useremail = req.query.useremail;
  const from = (req.query.from === undefined) ? '' : req.query.from;
  const hasTheWords = (req.query.hasTheWords === undefined) ? '' : req.query.hasTheWords;

  const SearchQuery = new Query(from, hasTheWords);
  const q = SearchQuery.queryMaker();

  const result = await GmailService.messagesParse(useremail, q);
  const count = result.length;

  const config = {
    useremail,
    'search-query': {
      status: 'changeable',
      query: q,
      from,
      hasTheWords,
    },
    'data': {
      count,
      result,
    }
  };

  res.send(config);
}));

router.get('/messages/parsing/:useremail', wrapper(async (req, res) => {
  const useremail = req.params.useremail;

  const q = ['from:(googleplay) 영수증'];

  const metadataList = await GmailService.messagesParse(useremail, q[0]);

  const result = await GmailService.divideByFrom(metadataList);

  res.json(result).end();
}));

router.get('/parsing/:useremail', wrapper(async (req, res) => {
  const useremail = req.params.useremail;

  const parsing = await GmailService.parsing(useremail);

  const listSubscription = [];

  // TODO(park): 가장 최근의 구독이 무엇인지 알아내는 알고리즘 필요
  for (const [key, value] of parsing) {
    if (key == 'renewal') {
      value.map((elem) => {
        console.log(elem);
      });
    }
  }

  res.json(Object.fromEntries(parsing)).end();
}));

router.post('/parsing', wrapper(async (req, res) => {
  const useremail = req.body.useremail;

  console.log('Gmail Parsing');
  console.log(useremail);

  const parsing = await GmailService.parsing(useremail);
  console.log(parsing);

  res.json(Object.fromEntries(parsing)).end();
}));


export default router;
