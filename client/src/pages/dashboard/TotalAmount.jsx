import React, {Component} from 'react';
import {Icon, Spin} from 'antd';

class TotalAmount extends Component {
  constructor(props) {
    super(props);
  }

  getTotalAmount = (subscriptions) => {
    let sum = 0;
    subscriptions.map((subscription) => sum += subscription.price);
    return sum;
  };

  render() {
    if (this.props.data == null) {
      const icon = <Icon type="loading" style={{fontSize: 24}} spin />;
      return (<Spin indicator={icon} />);
    }
    console.log(`test : ${this.props.test}`)
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
