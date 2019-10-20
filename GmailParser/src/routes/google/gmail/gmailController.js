import express from 'express';
const router = express.Router();

import GmailService from '../../../service/gmailService';
import GmailApi from '../../../util/gmailApi';
import GMAIL_SEARCH_QUERY from '../../../resources/static/GmailSearchQuery.json';

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

export default router;