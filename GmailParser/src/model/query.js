
class Query {
  constructor(from, subect) {
    this.from = from;
    this.subject = subect;
  }

  set fromElem(from) {
    if (typeof from === 'undefined') from = '';
    this.from = from;
  }

  set subjectElem(subject) {
    if (typeof subject === 'undefined') subject = '';
    this.subject = subject;
  }

  queryMaker() {
    return 'from:(' + this.from + ')' + ' ' + 'subject:(' + this.subject + ')';
  }
}

export default Query;