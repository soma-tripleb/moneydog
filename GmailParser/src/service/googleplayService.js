import GooglePlayParser from '../util/parser/email/googleplay/googleplayParser';
import GooglePlay from '../model/dto/googleplay';

import GmailService from './gmailService';

const parse = async (useremail) => {
  let listMessagesJson;
  const q = 'from:(김재연) 영수증';

  try {
    listMessagesJson = await GmailService.userMessages(useremail, q);
  } catch (err) {
    throw new Error(`GET_GOOGLEPLAY_RECEIPT_MESSAGES_ID`, err);
  }

  const parsingList = [];

  const promise = listMessagesJson.map(async (message) => {
    const GooglePlayDTO = new GooglePlay();

    let result;
    try {

      result = await GooglePlayParser.metadataParse(message, GooglePlayDTO, GooglePlayParser.iframeParse);

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
