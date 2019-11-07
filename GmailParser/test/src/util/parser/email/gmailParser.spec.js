import should from 'should';

import GMAIL_SEARCH_QUERY from 'resources/static/GmailSearchQuery';
import TestDataQuery from 'src/db/testdataQuery';
import { google } from 'googleapis';

describe('GmailParser는', () => {
  describe('Gmail 검색 쿼리 리스트를 순회 한다.(지금은 json 형태로 저장, 나중에는 DB에 저장)', () => {

    describe.only('`googleplay`에서 온 메일에 대해서 테스트 한다.', () => {

      let GOOGLEPLAY_QUERYS;

      before(() => {
        GOOGLEPLAY_QUERYS = GMAIL_SEARCH_QUERY.q.googleplay;
      });

      describe('쿼리에 맞게 테스트 데이터를 불러온다.', () => {
        it('성공 시', async () => {
          const googleplayMailMap = new Map();

          const promise = GOOGLEPLAY_QUERYS.map((elem) => {
            try {
              const messages = TestDataQuery.getByQ(elem.query);
              return googleplayMailMap.set(elem.category, messages);
            } catch (err) {
              throw err;
            }
          });

          Promise.all(promise)
            .then((result) => {
              console.log(result);
            });
        });
      });
    });
  });
});