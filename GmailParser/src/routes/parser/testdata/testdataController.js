import express from 'express';
const router = express.Router();

import TestDataQuery from '../../../../src/db/testdataQuery';

const checkBody = (req, res, next) => {
  if (!req.body.q) throw new Error('검색 키워드를 입력하세요.');
  if (!req.body.data) throw new Error('Gmail 데이터를 JSON 형식으로 추가하세요.');
  next();
};

// test gmail create
router.post('/insert', checkBody, async (req, res) => {
  const GMAIL_JSON = req.body.data;
  const q = req.body.q;

  // 검색 키워드, 메시지 ID, 요약, 제목, 날짜, 발신자
  const messageId = GMAIL_JSON.id;
  // const q = '';
  const snippet = GMAIL_JSON.snippet;
  let date;
  let subject;
  let from;

  let idx = 0;
  let flag = 3;

  while (flag > 0) {
    const header = GMAIL_JSON.payload.headers[idx++];

    const key = header.name.toLocaleLowerCase();
    const value = header.value;

    switch (key) {
      case 'date':
        date = value;
        flag--;
        break;
      case 'subject':
        subject = value;
        flag--;
        break;
      case 'from':
        from = value;
        flag--;
        break;
      default:
        break;
    }
  }

  const testdataForm = {
    messageId,
    q,
    snippet,
    date,
    subject,
    from,
    GMAIL_JSON
  };

  let result;

  try {
    result = await TestDataQuery.insertTestData(testdataForm);

  } catch (err) {
    throw new Error(`TESTDATA_CONTROLLER_INSERT `, err);
  }

  res.json(result).end();
});

router.get('/', async (req, res) => {
  const result = await TestDataQuery.getByQ(req.query.q);

  res.json(result).end();
});

router.delete('/delete/:messageId', async (req, res) => {
  const result = await TestDataQuery.deleteByObjectId(req.params.messageId);

  res.json(result).end();
});

export default router;
