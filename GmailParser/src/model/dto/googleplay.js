class GooglePlay {
  constructor() {
    // metadata in 'headers'
    this.messageId = null;
    this.createAt = null;
    this.from = null;
    this.to = null;
    this.subject = null;

    // metadata in 'data'
    this.snippet = null;

    // body
    this.bodyText = null;

    // iframe
    this.name = null;
    this.price = null;
    this.date = null;
    this.renewal = null;
    this.periodMonth = null;

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

  setBodyText(bodyText) {
    this.bodyText = bodyText;
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }

  setDate(date) {
    this.date = date;
  }

  setRenewal(renewal) {
    this.renewal = renewal;
  }

  setPeriodMonth(periodMonth) {
    this.periodMonth = periodMonth;
  }
}

export default GooglePlay;