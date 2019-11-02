import React, { Component } from 'react';

import TotalAmount from './TotalAmount';
import DuePayment from './DuePayment';
import Calendar from './Calendar';
import Categories from './Categories';
import List from './List';
import moment from 'moment';

import './dashboard.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  rdxUserSubscriptionsInfo: state.users.subscriptions,
});

class DashBoard extends Component {
  state = {
    subscription: null,
    selectedValue: new Date(),
    staticSubscribeArr: [],
    isFullMode: true,
  };

  showFullMode = (e) =>{
    e.preventDefault();

    this.setState({
      isFullMode: true
    });
  };

  handleChange = (e) => {
    console.log('handleChange');
    this.setState({
      selectedValue: e.format('YYYY-MM-DD'),
      isFullMode: false
    });
  };

  convertDate = () => {
    return moment(this.state.selectedValue, 'YYYY-MM-DD').date();
  };

  componentDidMount() {
    this.fetchSubscriptionInfo();
  };

  fetchSubscriptionInfo = () => {
    this.setState({
      subscription: this.props.rdxUserSubscriptionsInfo
    });

    return this.state.subscription;
  };

  render() {
    const { subscription, selectedValue } = this.state;

    return (
      <>
        <div className="container">

          <div className="align-self-center dashboard-inner">
            <div className="row align-items-center TotalAmount">
              <div className="col-md-3 rightLine">
                <TotalAmount data={subscription} />
              </div>
              <div className="col-md-3 rightLine">
                <DuePayment data={subscription}/>
              </div>
              <div className="col-md">
                광고
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 dashboard-inner">
              {/* 달력 - 월 */}
              <div className="calendar">
                <span className="calendar-component-title"> 결제 스케줄 </span>
                <Calendar date={selectedValue} handleChange={this.handleChange} data={subscription} />
              </div>
              {/* 달력 - 일 */}
              {/* <div className="list">*/}
              {/*  <span className="component-title"><u>일별 결제일 정보</u></span>*/}
              {/*  <List date={this.convertDate()} data={subscription} />*/}
              {/* </div>*/}
            </div>

            {/* 구독중인 서비스 list */}
            <div className="col-md-6 dashboard-inner">
              <div className='categories'>
                <span className="categories-component-title"> {new Date().getMonth() + 1}월 구독 결제 정보 </span>
                <button onClick={this.showFullMode} type="button" className="btn btn-outline-info"> 전체 정보 보기 </button>
                <Categories data={subscription} date={this.convertDate()} isFullMode={this.state.isFullMode}/>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
