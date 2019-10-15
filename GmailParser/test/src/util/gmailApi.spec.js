import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

import GMAIL_SEARCH_QUERY from '../../../src/resources/static/GmailSearchQuery.json';
import { google } from 'googleapis';

describe('Gmail API 사용하기', () => {

  const useremail = 'dudrnxps1@gmail.com';
  const {
    REFRESH_TOKEN_SAMPLE,
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL } = process.env;

  const messageList = [];
  let auth;

  describe('API 사용을 위한 변수 정보 확인', () => {
    it('`refresh_token` / `client_id` / `client_secret` / `redirect_url`', (done) => {
      assert.equal(REFRESH_TOKEN_SAMPLE, '1/9ddEeUEFwRvT4czxxBYWB6fZe78783PFCNnluaVlCbY');
      assert.equal(GOOGLE_API_CLIENT_ID, '532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com');
      assert.equal(GOOGLE_API_CLIENT_SECRET, 'QNzzHMDXr4MXhpxUuefGZnXO');
      assert.equal(GOOGLE_API_REDIRECT_URL, 'http://localhost:5000/google/signup');

      done();
    });
  });

  describe('Gmail API OAuth 인증 함수 만들기', () => {
    it('#oAuth2Client', (done) => {

      const authential = (refreshToken, callback) => {
        const { GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URL } = process.env;

        const oAuth2Client = new google.auth.OAuth2(
          GOOGLE_API_CLIENT_ID,
          GOOGLE_API_CLIENT_SECRET,
          GOOGLE_API_REDIRECT_URL );

        oAuth2Client.setCredentials(refreshToken);

        callback(oAuth2Client);
      };

      const test = (auth, err) => {
        assert.equal(auth._clientId, GOOGLE_API_CLIENT_ID);
        assert.equal(auth._clientSecret, GOOGLE_API_CLIENT_SECRET);
        assert.equal(auth.redirectUri, GOOGLE_API_REDIRECT_URL);

        if (err) throw done(err);
      };

      authential(process.env.REFRESH_TOKEN_SAMPLE, test);

      done();
    });
  });

  describe('사용자의 `refresh token 으로 API 사용', () => {
    it('#getMessageList', (done) => {

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_API_CLIENT_ID,
        process.env.GOOGLE_API_CLIENT_SECRET,
        process.env.GOOGLE_API_REDIRECT_URL,
      );

      oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN_SAMPLE });
      auth = oauth2Client;

      google.gmail({ version: 'v1', auth: oauth2Client })
        .users.messages.list({ 'userId': useremail, 'q': GMAIL_SEARCH_QUERY.APPLE })
        .then((result) => {
          assert.equal(result.status, 200);
          assert.equal(result.statusText, 'OK');

          result.data.messages.map((info) => {
            messageList.push(info.id);
          });

          done();
        })
        .catch((err) => {
          throw done(err);
        });
    });
  });

  describe('Message 목록으로 내용 가져오기', () => {
    it('getMessage', (done) => {
      const gmail = google.gmail({ version: 'v1', auth: auth });

      messageList.some(async (message) => {
        const result = await gmail.users.messages.get({ 'userId': useremail, 'id': message });

        if (message !== result.data.id) throw done(err);
      });

      done();
    });
  });
});
