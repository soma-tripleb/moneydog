import CommonParser from '../../../src/util/parser/email/commonParser';

class Gmail {
  constructor() {
    // metadata in 'headers'
    this.messageId = null;
    this.createAt = null;
    this.from = null;
    this.to = null;
    this.subject = null;

    // metadata in 'data'
    this.snippet = null;

    // payload > body
    this.body = null;

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

  setBody(body) {
    if (!body) this.body = null;
    else {
      this.body = CommonParser.base64ToUtf8(body);
    }
  }

  setBody1(body1) {
    if (!body1) this.body1 = null;
    else {
      const bodyDecode = CommonParser.base64ToUtf8(body1);
      const bodyText = bodyDecode.replace(/\r\n/gi, '');

      this.body1 = bodyText;
    }
  }

  setBody2(body2) {
    if (!body2) this.body2 = null;
    else {
      const bodyDecode = CommonParser.base64ToUtf8(body2);

      this.body2 = bodyDecode;
    }
  }
}

export default Gmail;
