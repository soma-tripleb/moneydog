import React, { Component } from 'react';

import Calendar from './Calendar';
import Categories from './Categories';
import TotalAmount from './TotalAmount';
import List from './List';
import moment from 'moment';

import './dashboard.css';
import { connect } from 'react-redux';
import * as image from '../../../resources/static/img/templogo';

const mapStateToProps = (state) => ({
  rdxUserSubscriptionsInfo: state.users.subscriptions,
});

class DashBoard extends Component {
  state = {
    subscription: null,
    selectedValue: new Date(),
    staticSubscribeArr: []
  };

  handleChange = (e) => {
    this.setState({ selectedValue: e.format('YYYY-MM-DD') });
  };

  convertDate = () => {
    return moment(this.state.selectedValue).date();
  };

  componentDidMount = () => {
    this.fetchSubscriptionInfo();
  };

  fetchSubscriptionInfo = () => {
    this.setState({
      subscription: this.props.rdxUserSubscriptionsInfo.map(
        (content) => {
          return { ...content, logo: image[content.name.toLowerCase()] };
        }
      )
    });

    return this.state.subscription;
  };

  render() {
    const { subscription, selectedValue } = this.state;

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* 달력 - 월 */}
              <div className="calendar">
                <Calendar date={selectedValue} handleChange={this.handleChange} data={subscription} />
              </div>
              <hr />
              {/* 달력 - 일 */}
              <div className="list">
                <List date={this.convertDate()} data={subscription} />
              </div>
            </div>
            {/* 구독중인 서비스 list */}
            <div className="col-md-6">
              <div className='TotalAmount'>
                <TotalAmount data={subscription} />
              </div>
              <hr />
              <div className='categories'>
                <Categories data={subscription} />
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
