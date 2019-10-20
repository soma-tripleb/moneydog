import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class GoogleOAuth {

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_API_CLIENT_ID,
      process.env.GOOGLE_API_CLIENT_SECRET,
      process.env.GOOGLE_API_REDIRECT_URL,
    );
  };

  url() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile', process.env.GOOGLE_API_SCOPE]
    });
  };

  set credentials(tokens) {
    this.oauth2Client.setCredentials(
      { refresh_token: tokens.refresh_token }
    );
  };

  getToken(code) {
    return this.oauth2Client.getToken(code);
  };

  getProfile() {
    return google.oauth2('v2').userinfo.v2.me.get({ auth: this.oauth2Client });
  };
};

export default GoogleOAuth;