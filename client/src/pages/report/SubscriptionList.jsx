import React, {Component} from 'react';

class SubscriptionList extends Component {

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  showSubsList = () => {
    if (typeof this.props.data === 'undefined') {
      return;
    }

    const list = this.props.data.map(
      (content, i) => (
        <div key={i} className="container w-100" id="inner-element">
          <div className="row subs-inner-item">
            <div className="col">
              {content.name}
            </div>
            <div className="col">
              ₩ {this.numberWithCommas(content.price)}
            </div>
            <div className="col">
              {content.channel}
            </div>
          </div>
        </div>)
    );
    return list;
  };

  render() {
    return (
        <>
          <div className="headerFont">구독 리스트</div>
          {this.showSubsList()}
        </>
    );
  }
}

export default SubscriptionList;
