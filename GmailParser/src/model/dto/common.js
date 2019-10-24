class Common {

  constructor() {
    this.name = null;
    this.snippet = null;

    Object.preventExtensions(this);
  }

  setName(name) {
    this.name = name;
  };

  setSnippet(snippet) {
    this.snippet = snippet;
  }
};

export default Common;