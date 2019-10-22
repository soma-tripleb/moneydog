export default class MailQuery {
  constructor() {
    this.from = '';
    this.subject = '';
  }

  setFrom(from) {
    if (from === undefined) from = '';
    this.from = from;
  }

  setSubject(subject) {
    if (subject === undefined) subject = '';
    this.subject = subject;
  }
}