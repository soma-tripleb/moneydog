import PricePlan from './pricePlan';

class Subscription {
  constructor(userInputSubs) {
    this.seq = userInputSubs.seq;
    this.name = userInputSubs.name;
    this.price = userInputSubs.price;
    this.paymentDate = userInputSubs.paymentDate;
    this.channel = userInputSubs.channel;
    this.pricePlan = PricePlan;
  }
};

export default Subscription;