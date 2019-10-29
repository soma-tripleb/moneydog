
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
    return 'from:(' + this.from + ')' + ' ' + this.hasTheWords;
  }
}

export default Query;