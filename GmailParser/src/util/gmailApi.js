import GoogleOAuth from './googleOAuth';

import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

class GmailApi extends GoogleOAuth {

  constructor(refreshToken) {
    super();

    this.oauth2Client.setCredentials({ refresh_token: refreshToken });
  }

  listMessages(useremail, query) {
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

    return gmail.users.messages.list({ userId: useremail, q: query });
  };

  getMessages(useremail, messageId) {
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

    return gmail.users.messages.get({ 'userId': useremail, 'id': messageId });
  };
};

export default GmailApi;
