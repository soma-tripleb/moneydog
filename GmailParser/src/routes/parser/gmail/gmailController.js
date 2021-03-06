/**
 * @swagger
 * tags:
 *   name: GmailParser
 *   description: 사용자의 Gmail 을 파싱하여, 구독 서비스 정보를 스캔한다. 
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

import GmailService from '../../../../src/service/gmailService';
import SubscriptionDAO from '../../../../src/model/dao/subscription';
import UserQuery from '../../../../src/db/userQuery';

const router = express.Router();

const SERVER_BASE_URL = `${process.env.SERVER_BASE_URL}`;
const RESOURCE_URI = `${process.env.RESOURCE_URI}`;

const gmailParsingResponse = (result) => {
  console.log('Gmail Parsing End');
  axios({
    method: 'post',
    baseURL: SERVER_BASE_URL,
    url: RESOURCE_URI,
    data: {
      result: result
    }
  });
};

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

  res.json(Object.fromEntries(parsing)).end();
}));

/**
 * @swagger
 * /parsing:
 *   post:
 *     tags:
 *     - "GmailParser"
 *     summary: "'Google Play Store' 이메일 파싱"
 *     description: "Google Play Store 에서 온 메일에 대한 구독 서비스 정보를 스캔한다."
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "useremail"
 *     responses:
 *       200:
 *         description: 성공
 */
router.post('/parsing', wrapper(async (req, res) => {
  const useremail = req.body.useremail;

  console.log('Gmail Parsing Start ', useremail);

  const parsing = await GmailService.parsing(useremail);

  const listSubscription = [];

  // TODO(park): 가장 최근의 구독이 무엇인지 알아내는 알고리즘 필요
  for (const [key, value] of parsing) {
    if (key == 'trial') {
      value.map((elem) => {
        const category = elem.category;
        const name = elem.service;
        const price = elem.price;
        const paymentDate = elem.endDate;

        const Subscription = new SubscriptionDAO('', '', name, '', price, paymentDate, 'in-app');

        listSubscription.push(Subscription);
      });
    }

    if (key == 'subscription') {
      value.map((elem) => {
        const category = elem.category;
        const name = elem.service;
        const price = elem.price;
        const paymentDate = elem.endDate;

        const Subscription = new SubscriptionDAO('', '', name, '', price, paymentDate, 'in-app');

        listSubscription.push(Subscription);
      });
    }

    if (key == 'renewal') {
      value.map((elem) => {
        const category = elem.category;
        const name = elem.service;
        const price = elem.price;
        const paymentDate = elem.endDate;

        const Subscription = new SubscriptionDAO('', '', name, '', price, paymentDate, 'in-app');

        listSubscription.push(Subscription);
      });
    }
  }

  console.log(listSubscription);

  const insertResult = await UserQuery.insertSubscriptions(useremail, listSubscription);

  const result = {
    useremail,
    insertResult
  };

  gmailParsingResponse(result);

  res.json(result).end();
}));


export default router;
