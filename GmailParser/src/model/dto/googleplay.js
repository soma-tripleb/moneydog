class GooglePlay {

  constructor() {
    this.category = '';
    this.service = '';
    this.price = '';
    this.endDate = '';
  }

  setCategory(category) {
    this.category = category;
    return this;
  }

  setService(service) {
    this.service = service.replace('Google Play에서 ', '');
    return this;
  }

  setPrice(price) {
    if (price.indexOf('합계: ') == -1) { // '-1' 이면 해당 문자열이 없는 것
      this.price = price;
    } else {
      this.price = price.replace('합계: ', '');
    }
    return this;
  }

  setEndDate(endDate) {
    const dateRegex = /(19|20)\d{2}. ([1-9]|1[012]). ([1-9]|[12][0-9]|3[0-1])./;
    this.endDate = endDate.match(dateRegex)[0];
    return this;
  }
};

export default GooglePlay;
