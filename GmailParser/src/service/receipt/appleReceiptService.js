import AppleParser from '../../util/parser/email/apple/appleParser';
import AppleParser2 from '../../util/parser/email/apple/appleParser2';
import AppleReceipt from '../../model/dto/mail/apple';
import AppleDiverseBody from '../../model/dto/mail/apple2';

import GmailService from '../gmailService';

const parse = async (useremail) => {
  try {
    const listMessagesJson = await GmailService.userMessages(useremail);

    const parsingList = [];
    listMessagesJson.map((message) => {
      const AppleReceiptForm = new AppleDiverseBody();

      const result = AppleParser2.appleMailParse(message, AppleReceiptForm);

      console.log(result);

      parsingList.push(result);
    });

    return parsingList;
  } catch (err) {
    throw err;
  }
};

export default {
  parse,
};
