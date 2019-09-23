class PricePlan {
  constructor(subsTmplPricePlan) {
    this.seq = subsTmplPricePlan.seq;
    this.title = subsTmplPricePlan.title;
    this.price = subsTmplPricePlan.price;
    this.period = subsTmplPricePlan.period;
    this.channel = subsTmplPricePlan.channel;
  }
}

export default PricePlan;