import assert from 'assert';
import Query from '../../../src/model/query';
import GMAIL_SEARCH_QUERY from '../../../resources/static/GmailSearchQuery.json';

describe('Mail Query Test', () => {

  const subjectMap = new Map();

  let length;
  let keyArr;
  let valueArr;

  before(() => {
    length = GMAIL_SEARCH_QUERY.SUBJECT.LENGTH;
    keyArr = GMAIL_SEARCH_QUERY.SUBJECT.KEY;
    valueArr = GMAIL_SEARCH_QUERY.SUBJECT.VALUE;

    for (let i = 0; i < length; i++) {
      subjectMap.set(keyArr[i], valueArr[i]);
    };
  });

  describe('저장해 놓은 검색 쿼리 확인', () => {
    it('#GMAIL_SEARCH_QUERY', () => {

      return new Promise((res) => {
        assert.equal(subjectMap.get('korean_subscription'), '구독');
        assert.equal(subjectMap.get('korean_receipt'), '영수증');

        res(true);
      });

    });
  });

  describe('메일 검색을 위한 검색 쿼리 `from` 과 `subject` 의 유효성 검사', () => {
    it('#maker', (done) => {
      const MailQuery = new Query();

      MailQuery.fromElem = 'no_reply@apple.email.com';
      MailQuery.subjectElem = 'korean_subscription';

      const from = MailQuery.fromMaker();
      const subject = MailQuery.subjectMaker();
      const q = MailQuery.queryMaker(from, subject);

      assert.equal(q, 'from:(no_reply@apple.email.com) subject:(구독)');

      done();
    });
  });
});