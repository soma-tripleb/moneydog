import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

class GoogleOAuth {

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_API_CLIENT_ID,
      process.env.GOOGLE_API_CLIENT_SECRET,
      process.env.GOOGLE_API_REDIRECT_URL
    );
  }
};

export default GoogleOAuth;
