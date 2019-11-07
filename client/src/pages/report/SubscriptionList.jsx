import React, {Component} from 'react';
import moment from 'moment';

class SubscriptionList extends Component {
  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  showSubsListTitle= () => {
    return (
      <div className="container w-100 report-inner-subsList" >
        <div className="row subs-inner-item">
          <div className="col">
            상품명
          </div>
          <div className="col">
             가격
          </div>
          <div className="col">
            자동 갱신 날짜
          </div>
        </div>
      </div>);
  };

  showSubsList = () => {
    if (typeof this.props.data === 'undefined') {
      return;
    }

    const list = this.props.data.map(
      (content, i) => (
        <div key={i} className="container w-100 report-inner-subsList">
          <div className="row subs-inner-item">
            <div className="col">
              {content.name}
            </div>
            <div className="col">
              ₩ {this.numberWithCommas(content.price)}
            </div>
            <div className="col">
              {moment(content.paymentDate).format('YYYY-MM-DD')}
            </div>
          </div>
        </div>)
    );
    return list;
  };

  render() {
    return (
      <>
        <div className="report-subtitle">구독 리스트</div>
        {this.showSubsListTitle()}
        {this.showSubsList()}
      </>
    );
  }
}

export default SubscriptionList;
