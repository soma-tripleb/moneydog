import React, { Component } from 'react';
import counterUp from 'counterup2';

class TotalAmount extends Component {

  state ={
    sum: 0,
  };

  componentWillReceiveProps(nextProps) {
    this.getTotalAmount(nextProps.data);
  };

  componentDidUpdate(prevProps, prevState) {
    counterUp(document.querySelector('.counter'), {
      duration: 1000,
      delay: 16
    });
  }

  getTotalAmount = (subsList) => {
    let sum = 0;

    if (subsList !== null) {
      subsList.map((subscription) => {
        sum += Number(subscription.price);
      });
    }

    console.log(sum);

    this.setState({
      sum: sum,
    });
    // return this.numberWithCommas(sum);
  };

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  render() {
    return (
      <>
        <div className="col amount-container">
          <div className="component-title">총 &nbsp; 결제금액</div>
          <div className="total-amount-text">
            <span className="pricePredix"> 매월 </span>
            <span className="price">
              <span className="counter">{this.numberWithCommas(this.state.sum)}</span> 원
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default TotalAmount;

