class Subscription {
  constructor(seq, logoURI, name, color, price, paymentDate, channel) {
    this.seq = seq;
    this.logoURI = logoURI;
    this.name = name;
    this.color = color;
    this.price = price;
    this.paymentDate = paymentDate;
    this.channel = channel;
  }
}

export default Subscription;