import express from 'express';
const router = express.Router();

import AppleReceiptService from '../../service/receipt/appleReceiptService';
import Query from '../../model/query';
import MailQuery from '../../util/mailQuery';

router.get('/apple/:useremail/:from/:subject', async (req, res) => {
  const useremail = req.params.useremail;
  const from = req.params.from;
  const subject = req.params.subject;

  const UserQuery = new Query();

  UserQuery.setFrom(from);
  UserQuery.setSubject(subject);

  try {
    const q = await MailQuery.querying(UserQuery);
    // const result = await AppleReceiptService.parse(useremail);

    res.send({
      useremail,
      q,
    });
  } catch (err) {
    throw err;
  }
});

export default router;