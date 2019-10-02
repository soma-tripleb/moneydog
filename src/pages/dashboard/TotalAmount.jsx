import React, { Component } from 'react';

class TotalAmount extends Component {
  constructor(props) {
    super(props);
  }

  getTotalAmount = () => {
    let sum = 0;

    if (this.props.data !== null) {
      this.props.data.map((subscription) => {
        sum += Number(subscription.price);
      });
    }

    return this.numberWithCommas(sum);
  };

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    return (
      <div>
        TotalAmount
        <div className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              <span className="total-amount-text">₩ {this.getTotalAmount()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalAmount;

