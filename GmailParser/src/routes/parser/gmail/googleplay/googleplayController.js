import express from 'express';
const router = express.Router();

import GmailService from 'src/service/gmailService';
import GooglePlayParser from 'src/util/parser/email/googleplay/googlePlayParser';
import GooglePlayService from 'src/service/googleplayService';

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

router.get('/body1/:useremail', wrapper(async (req, res) => {
  const useremail = req.params.useremail;
  const q = 'from:(googleplay) 영수증';
  const q1 = 'from:(googleplay) 영수증 -{무료}';
  const q2 = 'from:(googleplay) 영수증, 무료';

  const GmailDTOList = await GmailService.messagesParse(useremail, q);
  const GmailDTOList1 = await GmailService.messagesParse(useremail, q1);
  const GmailDTOList2 = await GmailService.messagesParse(useremail, q2);

  const total = GmailDTOList.length;
  const total1 = GmailDTOList1.length;
  const total2 = GmailDTOList2.length;

  const list = [];
  const list1 = [];
  const list2 = [];

  const result = {
    q: q,
    data: {
      total,
      list
    },
    q1: q1,
    data1: {
      total1,
      list1
    },
    q2: q2,
    data2: {
      total2,
      list2
    },
  };

  GmailDTOList.map((metadata) => {
    const snippet = metadata.snippet;
    const body1 = metadata.body1;

    list.push({
      snippet,
      body1
    });
  });

  GmailDTOList1.map((metadata) => {
    const snippet = metadata.snippet;
    const body1 = metadata.body1;

    const body1Parse = GooglePlayParser.body1ParserOfIndex(metadata);

    list1.push({
      snippet,
      body1,
      body1Parse
    });
  });

  GmailDTOList2.map((metadata) => {
    const snippet = metadata.snippet;
    const body1 = metadata.body1;

    const body1Parse = GooglePlayParser.body1ParseOfFree(metadata);

    list2.push({
      snippet,
      body1,
      body1Parse
    });
  });

  res.json(result).end();
}));

export default router;