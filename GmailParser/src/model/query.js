
class Query {
  constructor(from, hasTheWords) {
    this.from = from;
    this.hasTheWords = hasTheWords;
  }

  set fromElem(from) {
    if (typeof from === 'undefined') from = '';
    this.from = from;
  }

  set hasTheWordsElem(hasTheWords) {
    if (typeof hasTheWords === 'undefined') hasTheWords = '';
    this.hasTheWords = hasTheWords;
  }

  queryMaker() {
    const fromForm = (this.from) ? 'from:(' + this.from + ') ' : '';
    const hasTheWords = (this.hasTheWords) ? this.hasTheWords : '';

    return fromForm + hasTheWords;
  }
}

export default Query;