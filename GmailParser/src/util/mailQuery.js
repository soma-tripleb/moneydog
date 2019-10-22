import GmailSearchQuery from '../../resources/static/GmailSearchQuery';

const querying = async (UserQuery) => {
  const from = fromMaker(UserQuery.from);
  const subject = subjectMaker(UserQuery.subject);

  return queryMaker(from, subject);
};

const fromMaker = (from) => {
  return 'from:(' + from + ')';
};

/**
 * 'subject' 검색어 자체가 영어일 경우 고려해야 한다.
 * @param {*} subject 
 */
const subjectMaker = (subject) => {
  const subjectQueryKeyList = GmailSearchQuery.subject.key;
  const subjectQueryValueList = GmailSearchQuery.subject.value;
  const subjectQueryListLength = GmailSearchQuery.subject.length;

  const subjectMap = new Map();

  for (let i = 0; i < subjectQueryListLength; i++) {
    subjectMap.set(subjectQueryKeyList[i], subjectQueryValueList[i]);
  };

  const translateSubject = subjectMap.get(subject);

  if (translateSubject === undefined) translateSubject = '';

  return 'subject:(' + subject + ')';
};

const queryMaker = (fromMaker, subjectMaker) => {
  return fromMaker + ' ' + subjectMaker;
};

export default {
  querying
};