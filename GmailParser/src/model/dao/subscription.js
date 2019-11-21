const colorPull = ['#fe7e79', '#ffd578', '#fffb77', '#d5fc78',
  '#73fa78', '#71fcd6', '#70fefe', '#75D5fe',
  '#7981ff', '#d782ff', '#ff83ff', '#fe8ad9'];

class Subscription {
  constructor(seq, logoURI, name, color, price, paymentDate, channel) {
    this.seq = seq;
    this.logoURI = logoURI;
    this.name = name;
    this.color = this.setColor();
    this.price = price;
    this.paymentDate = paymentDate;
    this.channel = channel;
  }


  setColor() {
    const random = Math.floor(Math.random() * 12);
    return colorPull[random];
  }
}

export default Subscription;
