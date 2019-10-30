import AppleReceiptParser from '../util/parser/email/apple/appleReceiptParser';
import AppleReceipt from '../model/dto/apple';

import GmailService from './gmailService';

const parse = async (useremail) => {

  let listMessagesJson;
  const q = 'from:(apple) subject:(영수증)';

  try {
    listMessagesJson = await GmailService.userMessages(useremail, q);
  } catch (err) {
    throw new Error(`GET_APPLE_RECEIPT_MESSAGES_ID`, err);
  }

  const parsingList = [];

  const promise = listMessagesJson.map(async (message) => {
    const AppleReceiptDTO = new AppleReceipt();

    let result;
    try {

      result = await AppleReceiptParser.metadataParse(message, AppleReceiptDTO, AppleReceiptParser.iframeParse);
    } catch (err) {
      throw new Error(`METADATA_PARSE ` + err);
    }

    parsingList.push(result);
  });

  await Promise.all(promise);

  return parsingList;
};

export default {
  parse,
};
