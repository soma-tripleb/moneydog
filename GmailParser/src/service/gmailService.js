import GmailApi from '../util/gmailApi';
import UserQuery from '../db/usersQuery';

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

const userMessages = async (useremail) => {
  try {
    const userRefreshToken = await UserQuery.getRefreshToken(useremail);

    const Gmail = new GmailApi(userRefreshToken);

    const messagesList = await Gmail.listMessages(useremail, GMAIL_SEARCH_QUERY.APPLE);

    const result = [];

    const promise = messagesList.data.messages.map(async (message) => {

      const messageId = message.id;

      const content = await Gmail.getMessages(useremail, messageId);

      result.push(content);
    });

    await Promise.all(promise);

    return result;

  } catch (err) {
    throw err;
  }
};

export default {
  userMessagesId,
  userMessages,
};
