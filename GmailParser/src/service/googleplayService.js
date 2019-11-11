import GooglePlayParser from '../util/parser/email/googleplay/googleplayParser';
import GooglePlay from '../model/dto/googleplay';

import GmailService from './gmailService';

import GMAIL_SEARCH_QUERY from 'resources/static/GmailSearchQuery';

import GooglePlay2 from 'src/model/dto/googleplay2';

const GOOGLEPLAY_QUERY = (() => {
  return GMAIL_SEARCH_QUERY.q.googleplay;
})();

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

const queryParsing = async (useremail) => {

  const googleplayMassages = new Map();

  // 쿼리를 기준으로 메일 불러오기
  for (const elem of GOOGLEPLAY_QUERY) {
    const category = elem.category;
    const query = elem.query;

    const metadataParsingResultList = await GmailService.messagesParse(useremail, query);

    switch (category) {
      case 'trial':
        const trialResult = [];

        metadataParsingResultList.map((metadata) => {
          const parsingResult = GooglePlayParser.body1ParserOfTrial(metadata);

          const GP = new GooglePlay2()
            .setCategory('trial')
            .setService(parsingResult.serviceNameStr)
            .setPrice(parsingResult.originalPrice)
            .setEndDate(parsingResult.endDateStr);

          trialResult.push(GP);
        });

        googleplayMassages.set(category, trialResult);
        break;
      case 'subscription':
        const subscriptionResult = [];

        metadataParsingResultList.map((metadata) => {
          const parsingResult = GooglePlayParser.body1ParserOfSubscribe(metadata);

          subscriptionResult.push(parsingResult);
        });

        googleplayMassages.set(category, subscriptionResult);
        break;
      case 'renewal':
        const renewalResult = [];

        metadataParsingResultList.map((metadata) => {
          const parsingResult = GooglePlayParser.body1ParserOfRenewal(metadata);

          renewalResult.push(parsingResult);
        });

        googleplayMassages.set(category, renewalResult);
        break;
    };
  }

  return googleplayMassages;
};

export default {
  parse,
  queryParsing,
};
