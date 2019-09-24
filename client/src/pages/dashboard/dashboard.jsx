import React, {Component} from 'react';

import Calendar from './Calendar';
import Categories from './Categories';
import TotalAmount from './TotalAmount';
import List from './List';
import moment from 'moment';

import * as service from './dashboard.ajax';

import 'babel-polyfill';
import './dashboard.css';
import {connect} from 'react-redux';
import * as image from '../../static/img/templogo';

class DashBoard extends Component {
  state= {
    subscription: null,
    selectedValue: new Date(),
    staticSubscribeArr: []
  };

  handleChange = (e) => {
    this.setState({selectedValue: e.format('YYYY-MM-DD')});
  };

  convertDate = () => {
    return moment(this.state.selectedValue).date();
  };

  componentDidMount() {
    this.fetchSubscriptionInfo();
  }

  fetchSubscriptionInfo = async () => {
    const response = await service.getSubscriptionByToken();

    this.setState({
      subscription: response.data,
    });

    this.setState({
      subscription: this.state.subscription.map(
        (content) => {
          return {...content, logo: image[content.name.toLowerCase()]};
        }
      )
    });

    return this.state.subscription;
  };

  render() {
    return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {/* 달력*/}
                <div className="calendar">
                  <Calendar date={this.state.selectedValue} handleChange={this.handleChange} data={this.state.subscription}/>
                </div>
                <hr/>
                <div className="list">
                  <List date={this.convertDate()} data={this.state.subscription} />
                </div>
              </div>
              {/* 구독중인 서비스 list */}
              <div className="col-md-6">
                <div className='TotalAmount'>
                  <TotalAmount data={this.state.subscription}/>
                </div>
                <hr/>
                <div className='categories'>
                  <Categories data={this.state.subscription}/>
                </div>
              </div>

            </div>
          </div>
        </>
    );
  }
}
// Access Redux store
const mapStateToProps = (state) => ({
});

// get action
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
