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
import SubsTmplService from '../subscribing/subscriptions.ajax';
import * as image from '../../static/img/templogo';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state= {
      subscription: null,
      selectedValue: null,
      staticSubscribeArr: []
    };
  }

  handleChange = (e) => {
    this.setState({selectedValue: e.format('YYYY-MM-DD')});
  };

  convertDate = () => {
    const convert = moment(this.state.selectedValue).date();
    return convert;
  }

  // Component Life Cycle
  componentDidMount() {
    this.fetchSubscriptionInfo();
    this.ajaxGetSubTemplate();
  }
  // Get static Subsribe Service
  ajaxGetSubTemplate = async () => {
    const token = this.props.token;
    const response = await SubsTmplService.getList(token);
    this.setState({
      staticSubscribeArr: response.data.message,
    });

    this.state.staticSubscribeArr.map(
      (content) => {
        content.logo = image[content.thumbnail];
        console.log(`logo : ${content.logo}`);
      }
    );
  };

  fetchSubscriptionInfo = async () => {
    const response = await service.getSubscriptionByToken(this.props.token);
    this.setState({
      subscription: response.data,
    });
  };

  insertSubscibeLogo = ()

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

            <footer>
            </footer>
          </div>
        </>
    );
  }
}
// Access Redux store
const mapStateToProps = (state) => ({
  token: state.auth.status.JWT,
});

// get action
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
