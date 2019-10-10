import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

class GoogleOAuthApi {

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_API_CLIENT_ID,
      process.env.GOOGLE_API_CLIENT_SECRET,
      process.env.GOOGLE_API_REDIRECT_URL,
    );

    this.code = '';
  }

  set setCode(code) {
    this.code = code;
  }

  get getCode() {
    return this.code;
  }

  async url() {
    return await this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [process.env.GOOGLE_API_SCOPE],
    });
  }

  async getTokensAsync(code) {
    return await this.oauth2Client.getToken(code);
  }
};

export default GoogleOAuthApi;
