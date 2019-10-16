import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

import GMAIL_SEARCH_QUERY from '../../../src/resources/static/GmailSearchQuery.json';

import { google } from 'googleapis';
import GmailApi from '../../../src/util/gmailApi';

describe('`gmailApi.spec.js`', () => {

  let USER_EMAIL;

  const { REFRESH_TOKEN_SAMPLE, GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URL } = process.env;

  before(() => {
    USER_EMAIL = 'dudrnxps1@gmail.com';
  });

  describe('API 사용을 위한 변수 정보 확인', () => {
    it('`refresh_token` / `client_id` / `client_secret` / `redirect_url`', () => {

      return new Promise(async (resolve) => {

        assert.equal(REFRESH_TOKEN_SAMPLE, '1//0ezZbN4saefzBCgYIARAAGA4SNwF-L9IrngtFMIO79Z_Chz_NPI-j7xT04kDKN6oJJO17ZZEGMlpRE7vh63sYSwkilvtcq4_hooA');
        assert.equal(GOOGLE_API_CLIENT_ID, '532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com');
        assert.equal(GOOGLE_API_CLIENT_SECRET, 'QNzzHMDXr4MXhpxUuefGZnXO');
        assert.equal(GOOGLE_API_REDIRECT_URL, 'http://localhost:5000/google/signup');

        assert.ok(true);
        resolve();
      });

    });
  });

  describe('Gmail API 사용하기 - (구글 예제 따라한 튜토리얼)', () => {

    let authorize;

    beforeEach(() => {
      authorize = (refreshToken, callback) => {
        const oAuth2Client = new google.auth.OAuth2(
          GOOGLE_API_CLIENT_ID,
          GOOGLE_API_CLIENT_SECRET,
          GOOGLE_API_REDIRECT_URL
        );

        oAuth2Client.setCredentials(
          { refresh_token: refreshToken }
        );

        callback(oAuth2Client, USER_EMAIL);
      };
    });

    describe('사용자의 Gmail Message ID 가져오기', () => {
      it('#listMessages', () => {

        return new Promise(async (resolve) => {

          const listMessages = async (auth) => {
            const gmail = google.gmail({ version: 'v1', auth: auth });

            try {
              const result = await gmail.users.messages.list({ userId: USER_EMAIL, q: GMAIL_SEARCH_QUERY.APPLE });

              assert.equal(result.status, 200);
              assert.equal(result.statusText, 'OK');

              resolve();
            } catch (err) {
              throw new Error('TEST_GMAILAPI_LISTMESSAGES_MESSAGES' + err);
            }

          };

          authorize(REFRESH_TOKEN_SAMPLE, listMessages);
        });
      });
    });


    describe('Message 목록으로 메일 내용 가져오기', () => {

      let listMessages;

      beforeEach(async () => {
        listMessages = async (auth) => {
          const gmail = google.gmail({ version: 'v1', auth: auth });

          try {
            const result = await gmail.users.messages.list({ userId: USER_EMAIL, q: GMAIL_SEARCH_QUERY.APPLE });

            return result.data.messages;
          } catch (err) {
            throw new Error('TEST_GMAILAPI_LIST_MESSAGES' + err);
          }
        };
      });

      it('#getMessage', () => {

        return new Promise(async (resolve) => {

          const getMessage = async (auth, useremail) => {
            let list;

            try {
              list = await listMessages(auth);
            } catch (err) {
              throw new Error('TEST_GMAILAPI_GET_MESSAGE' + err);
            }

            const gmail = google.gmail({ version: 'v1', auth: auth });

            list.map(async (message) => {
              const messageId = message.id;

              gmail.users.messages.get({ 'userId': useremail, 'id': messageId })
                .then((result) => {
                  assert.equal(result.status, 200);
                  assert.equal(result.statusText, 'OK');

                  resolve();
                })
                .catch((err) => {
                  throw new Error('TEST_GMAIL_GET_MESSAGE' + err);
                });
            });

          };

          authorize(REFRESH_TOKEN_SAMPLE, getMessage);
        });
      });
    });

  });

  describe('Gmail API 사용하기 - (`gmailApi.js`)', () => {

    describe('사용자 이메일과 `refresh_token`, `search_query` 를 이용하여, 메일 내용 가져오기', () => {
      it('#getMessages', async () => {

        let listCount;

        try {
          const list = await GmailApi.authorize(REFRESH_TOKEN_SAMPLE, USER_EMAIL, GMAIL_SEARCH_QUERY.APPLE, GmailApi.listMessages);

          listCount = list.length;
        } catch (err) {
          throw err;
        }

        let messagesCount;

        try {
          const result = await GmailApi.authorize(REFRESH_TOKEN_SAMPLE, USER_EMAIL, GMAIL_SEARCH_QUERY.APPLE, GmailApi.getMessages);

          messagesCount = result.length;
        } catch (err) {
          throw err;
        }

        assert.equal(listCount, messagesCount);

      });
    });
  });
});
