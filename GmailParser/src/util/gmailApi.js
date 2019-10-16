import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

import UsersQuery from '../db/usersQuery';

const {
  GOOGLE_API_CLIENT_ID,
  GOOGLE_API_CLIENT_SECRET,
  GOOGLE_API_REDIRECT_URL } = process.env;

const authorize = async (refreshToken, username, query, callback) => {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL
  );

  oAuth2Client.setCredentials(
    { refresh_token: refreshToken }
  );

  return await callback(oAuth2Client, username, query);
};

const listMessages = async (auth, username, query) => {

  let result;

  try {
    const gmail = google.gmail({ version: 'v1', auth: auth });

    result = await gmail.users.messages.list({ userId: username, q: query });

    return result.data.messages;
  } catch (err) {
    throw new Error(`UTIL_GMAIL_API` + err);
  }

};

const getMessages = async (auth, useremail, query) => {

  let list;
  const result = [];

  try {
    list = await listMessages(auth, useremail, query);

  } catch (err) {
    throw new Error(`UTIL_GMAIL_API` + err);
  }

  try {
    const gmail = google.gmail({ version: 'v1', auth: auth });
    let content;

    Promise.all(list.map((message) => {
      const messageId = message.id;

      content = gmail.users.messages.get({ 'userId': useremail, 'id': messageId });

      result.push(content);
    }));
  } catch (err) {
    throw new Error(`UTIL_GMAIL_API` + err);
  }

  return result;
};

const getRefreshToken = (username) => {
  return UsersQuery.getUser(username)
    .then((result) => {
      return result.refreshToken;
    })
    .catch((err) => {
      throw new Error(`GET_REFRESH_TOKEN_ERR ` + err);
    });
};

export default {
  authorize,
  listMessages,
  getMessages,
  getRefreshToken,
};
