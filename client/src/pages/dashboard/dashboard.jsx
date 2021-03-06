import React, { Component } from 'react';

import TotalAmount from './TotalAmount';
import DuePayment from './DuePayment';
import Calendar from './Calendar';
import Categories from './Categories';
import moment from 'moment';
import Commercial from './Commercial';

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

  redirectSubsInfo= (e) =>{
    e.preventDefault();

    this.props.history.push('/user/subscribing-info');
  };

  showFullMode = (e) =>{
    e.preventDefault();

    this.setState({
      isFullMode: true
    });
  };

  handleChange = (e) => {
    console.log(e.format('YYYY-MM-DD'));
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
                <Commercial/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 dashboard-inner">
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
            <div className="col-sm-6 dashboard-inner">
              <div className='categories'>
                <div className="row categories-row">
                  <div className="col-6  text-left align-self-center dashboard-padding-1px">
                    <span className="categories-component-title-month">{new Date().getMonth() + 1}</span>
                    <span className="categories-component-title">월&nbsp;구독&nbsp; 결제정보 </span>
                  </div>
                  <div className="col-6 text-right align-self-center padding-zero">
                    <button onClick={this.redirectSubsInfo} type="button" className="btn btn-sm btn-outline-info">  수정 하기 </button>
                    &nbsp;&nbsp;
                    <button onClick={this.showFullMode} type="button" className="btn btn-sm btn-outline-info"> 전체 보기 </button>
                  </div>
                </div>
                <Categories data={subscription} date={selectedValue} isFullMode={this.state.isFullMode}/>
              </div>
            </div>
            <div className="btn-padding"/>
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
