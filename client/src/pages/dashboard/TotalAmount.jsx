import React, { Component } from 'react';

class TotalAmount extends Component {

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
  };

  render() {
    return (
      <>
        <div className="col amount-container">
          <div className="component-title">총 결제 금액</div>
          <div className="total-amount-text">
            <span className="pricePredix"> 매월 </span>
            <span className="price"> {this.getTotalAmount()}원 </span>
          </div>
        </div>
      </>
    );
  }
}

export default TotalAmount;

