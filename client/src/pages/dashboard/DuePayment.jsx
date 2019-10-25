import React, { Component } from 'react';
import moment from 'moment';

class DuePayment extends Component {

  getDuePaymentAmount = () => {
    let sum = 0;
    const now = moment().date();
    if (this.props.data !== null) {
      this.props.data.map((subscription) => {
        const subsDate = moment(subscription.paymentDate, 'YYYY-MM-DD').date();
        if (now < subsDate) {
          sum += Number(subscription.price);
        }
      });
    }

    return this.numberWithCommas(sum);
  };

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  render() {
    return (
      <div>
        <div className="col amount-container">
          <div className="component-title">납부 예정 금액</div>
          <div className="total-amount-text">
            <span className="pricePredix redColor"> 총 </span>
            <span className="price redColor"> {this.getDuePaymentAmount()}원 </span>
          </div>
        </div>
      </div>
    );
  }
}

export default DuePayment;
