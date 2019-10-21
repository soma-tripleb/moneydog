import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

const mapStateToProps = (state) => ({
  rdxUserSubscriptionsInfo: state.users.subscriptions,
});

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptionList: this.props.rdxUserSubscriptionsInfo,
      subscriptionByDateMap: new Map(),
      matchedSubscriptionList: [],
      date: '',
    };

    this.setPaymentDateByCalenderDate();
  };

  setPaymentDateByCalenderDate = () => {
    const { subscriptionList, subscriptionByDateMap } = this.state;

    subscriptionList.map((subscription) => {
      const date = moment(subscription.paymentDate, 'YYYY/MM/DD').date();

      let tempList = [];

      if (subscriptionByDateMap.get(date)) {
        tempList = subscriptionByDateMap.get(date);

        subscriptionByDateMap.set(date, [...tempList, subscription]);
      } else {
        subscriptionByDateMap.set(date, [subscription]);
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let result;
    const clickedDate = nextProps.date;

    if (prevState.date !== nextProps.date) {
      result = {matchedSubscriptionList: prevState.subscriptionByDateMap.get(clickedDate)};
    } else
      result = prevState;

    return result;
  }

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      console.log(subsAppInfo.color);
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0]}</button>);
    } else {
      return (<img className="list-logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
    }
  };

  showSubscriptionsByDate = () => {
    const list = ((this.state.matchedSubscriptionList !== undefined) ? this.state.matchedSubscriptionList : []);

    return list.map((subscription, i) => {
      return (
        <div className='col-2 list-img-border' key={i}>
          <p className='list-img-border-title'>{subscription.name}</p>
          {this.showSubscibeImg(subscription)}
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <div className="list-container">
          <span className="list-title">{this.props.date}일</span>
          <div className='list-inner-container'>
            {this.showSubscriptionsByDate()}
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
