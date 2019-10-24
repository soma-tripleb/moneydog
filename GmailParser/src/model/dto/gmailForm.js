class GmailForm {
  constructor() {
    // metadata
    this.id = null;
    this.snippet = null;
    this.date = null;
    this.from = null;
    this.subject = null;

    // iframe
    this.body1 = null;
    this.body2 = null;

    Object.preventExtensions(this);
  }

  setId(id) {
    this.id = id;
  }

  setSnippet(snippet) {
    this.snippet = snippet;
  }

  setDate(date) {
    this.date = date;
  }

  setFrom(from) {
    this.from = from;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setBody1(body) {
    this.body1 = body;
  }

  setBody2(body) {
    this.body2 = body;
  }
}

export default GmailForm;