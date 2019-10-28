class GmailForm {
  constructor() {
    // metadata in 'headers'
    this.messageId = null;
    this.createAt = null;
    this.from = null;
    this.to = null;
    this.subject = null;

    // metadata in 'data'
    this.snippet = null;

    // iframe in 'payload > parts'
    this.body1 = null;
    this.body2 = null;

    Object.preventExtensions(this);
  }

  setMessageId(messageId) {
    this.messageId = messageId;
  }

  setCreateAt(createaAt) {
    this.createAt = createaAt;
  }

  setFrom(from) {
    this.from = from;
  }

  setTo(to) {
    this.to = to;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setSnippet(snippet) {
    this.snippet = snippet;
  }

  setBody1(body) {
    this.body1 = body;
  }

  setBody2(body) {
    this.body2 = body;
  }
}

export default GmailForm;