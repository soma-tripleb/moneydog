import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

const getToken = async (code) => {
  const {
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL,
  } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL
  );

  return oAuth2Client.getToken(code);
};

export default {
  getToken,
};
