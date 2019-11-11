class GooglePlay2 {

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
    const regex = /\((.*)\)/;
    this.price = price.match(regex)[1];
    return this;
  }
  setEndDate(endDate) {
    const dateRegex = /(19|20)\d{2}. ([1-9]|1[012]). ([1-9]|[12][0-9]|3[0-1])./;
    this.endDate = endDate.match(dateRegex)[0];
    return this;
  }
};

export default GooglePlay2;
