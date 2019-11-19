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
    const priceArr = price.split('(');

    const onlyNumberRegex = /[^0-9]/g; // 숫자만

    const price0 = priceArr[0].replace(onlyNumberRegex, '');
    const price1 = priceArr[1].replace(onlyNumberRegex, '');

    if (price0 == '') {
      this.price = price1;
    } else {
      this.price = price0;
    }

    return this;
  }

  setEndDate(endDate) {
    const dateRegex = /(19|20)\d{2}. ([1-9]|1[012]). ([1-9]|[12][0-9]|3[0-1])./;
    const dateStr = endDate.match(dateRegex)[0];
    const deleteDotDate = dateStr.replace(/\./g, '');
    const pushDashDate = deleteDotDate.replace(/ /g, '-');
    this.endDate = pushDashDate;

    return this;
  }
};

export default GooglePlay;
