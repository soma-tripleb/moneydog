import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

import GMAIL_SEARCH_QUERY from '../../../src/resources/static/GmailSearchQuery.json';
import { google } from 'googleapis';

describe('Gmail API 사용하기', () => {

  const USER_EMAIL = 'dudrnxps1@gmail.com';
  const {
    REFRESH_TOKEN_SAMPLE,
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URL } = process.env;

  const messageList = [];

  let _AUTH;

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
    it('#oAuth2Client', async (done) => {

      const authential = (refreshToken, err) => {
        const oAuth2Client = new google.auth.OAuth2(
          GOOGLE_API_CLIENT_ID,
          GOOGLE_API_CLIENT_SECRET,
          GOOGLE_API_REDIRECT_URL);

        oAuth2Client.setCredentials(refreshToken);

        if (err) throw done(err);

        return oAuth2Client;
      };

      _AUTH = await authential('dsa');

      const gmail = await google.gmail({ version: 'v1', auth: _AUTH });

      console.log(_AUTH);

      gmail.users.messages.list({ 'userId': USER_EMAIL, 'q': GMAIL_SEARCH_QUERY.APPLE })
        .then((result, err) => {
          assert.equal(result.status, 200);
          assert.equal(result.statusText, 'OK');

          result.data.messages.map((info) => {
            console.log(info);
            messageList.push(info.id);
          });

          if (err) throw done(err);
          done();
        })
        .catch((err) => { throw done(err); });

    });
  });

  describe('만든 OAuth 함수로 Gmail Message 불러오기', () => {
    it('#getMessageList', (done) => {
      done();
    });
  });

  describe('Message 목록으로 내용 가져오기', () => {
    it('#getMessage', (done) => {

      const gmail = google.gmail({ version: 'v1', auth: _AUTH });

      messageList.some(async (message) => {
        const result = await gmail.users.messages.get({ 'userId': USER_EMAIL, 'id': message });

        if (message !== result.data.id) throw done(err);
      });

      done();

    });
  });
});
