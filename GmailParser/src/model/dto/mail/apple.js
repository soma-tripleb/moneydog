class Apple {
  constructor() {
    this.id = null,
    this.snippet = null,
    this.smtp = null,
    this.subject = null,
    this.from = null,
    this.name = null,
    this.price = null,
    this.date = null,
    this.renewal = null,
    this.periodMonth = null,

    Object.preventExtensions(this);
  }

  setId(id) {
    this.id = id;
  }

  setSnippet(snippet) {
    this.snippet = snippet;
  }

  setSmtp(smtp) {
    this.smtp = smtp;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setFrom(from) {
    this.from = from;
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