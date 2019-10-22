class AppleDiverseBody {
  constructor() {
    this.id = null;
    this.snippet = null;
    this.date = null;
    this.from = null;
    this.subject = null;
    this.name = null;
    this.price = null;
    this.date = null;

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

  setBody(body) {
    this.body = body;
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
}

export default AppleDiverseBody;