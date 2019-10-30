import GmailApi from '../util/gmailApi';
import UserQuery from '../db/usersQuery';

import Gmail from '../model/dto/gmail';
import GmailParser from '../util/parser/email/gmailParser';

import GMAIL_SEARCH_QUERY from '../../resources/static/GmailSearchQuery.json';

const userMessagesId = async (useremail) => {
  try {
    const userRefreshToken = await UserQuery.getRefreshToken(useremail);

    const Gmail = new GmailApi(userRefreshToken);

    return await Gmail.listMessages(useremail, GMAIL_SEARCH_QUERY.test);
  } catch (err) {
    throw err;
  }
};

const userMessages = async (useremail, q) => {
  try {
    const userRefreshToken = await UserQuery.getRefreshToken(useremail);

    const Gmail = new GmailApi(userRefreshToken);

    const messagesList = await Gmail.listMessages(useremail, q);

    const result = [];
    if (messagesList.data.resultSizeEstimate !== 0) {
      const promise = messagesList.data.messages.map(async (message) => {
        const messageId = message.id;
        const content = await Gmail.getMessages(useremail, messageId);

        result.push(content);
      });

      await Promise.all(promise);
    }

    return result;

  } catch (err) {
    throw new Error(`GET_USER_MESSAGES ` + err);
  }
};

const messagesParse = async (useremail, q) => {

  let messagesList;

  try {
    messagesList = await userMessages(useremail, q);
  } catch (err) {
    throw new Error(`GET_GMAIL_MESSAGE_LIST_ERROR ` + err);
  }

  const result = [];

  const promise = messagesList.map((messages) => {
    try {
      const GmailDTO = new Gmail();

      const parsing = GmailParser.metadataParse(messages, GmailDTO);

      result.push(parsing);
    } catch (err) {
      throw new Error(`GMAIL_PARSER_ERROR ` + err);
    }
  });

  await Promise.all(promise);

  return result;
};

export default {
  userMessagesId,
  userMessages,
  messagesParse,
};
