import React, { Component } from 'react';

class TotalAmount extends Component {
  getTotalAmount = (subscriptions) => {
    if (this.props.data !== null) {
      let sum = 0;
      subscriptions.map((subscription) => sum += subscription.price);
      return sum;
    }
  };

  render() {
    return (
      <div>
      TotalAmount
        <div className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              <button>
             이번달 총 이용 금액은 {this.getTotalAmount(this.props.data)}입니다.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalAmount;

