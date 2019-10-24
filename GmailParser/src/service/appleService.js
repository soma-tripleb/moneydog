import AppleParser from '../util/parser/email/apple/appleParser';
import AppleParser2 from '../util/parser/email/apple/appleParser2';
import AppleReceipt from '../model/dto/apple';
import GmailForm from '../model/dto/gmailForm';

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
      result = await AppleParser2.metadataParse(message, AppleReceiptDTO, AppleParser2.iframeParse);
    } catch (err) {
      throw new Error(`METADATA_PARSE ` + err);
    }

    parsingList.push(result);
  });

  await Promise.all(promise);

  return parsingList;
};

// const getBody = async (useremail, q) => {
//   let listMessagesJson;

//   try {
//     listMessagesJson = await GmailService.userMessages(useremail, q);
//   } catch (err) {
//     throw new Error(`GET_MESSAGES`, err);
//   }

//   const parsingList = [];

//   const promise = listMessagesJson.map( (message) => {
//     const GmailDTO = new GmailForm();

//     let result;
//     try {
//       result = AppleParser2.metadataParse2(message, GmailDTO);
//     } catch (err) {
//       throw new Error(`METADATA_PARSE2`, err);
//     }

//     parsingList.push(result);
//   });

//   await Promise.all(promise);

//   return parsingList;
// };

export default {
  parse,
};
