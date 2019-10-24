class Apple {
  constructor() {
    this.id = null;
    this.snippet = null;
    this.subject = null;
    this.from = null;
    this.bodyText = null;

    // body
    this.fromEmail = null;
    this.name = null;
    this.price = null;
    this.date = null;
    this.renewal = null;
    this.periodMonth = null;

    Object.preventExtensions(this);
  }

  setId(id) {
    this.id = id;
  }

  setSnippet(snippet) {
    this.snippet = snippet;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setFrom(from) {
    this.from = from;
  }

  setBodyText(bodyText) {
    this.bodyText = bodyText;
  }

  setFromEmail(fromEmail) {
    this.fromEmail = fromEmail;
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

export default Apple;