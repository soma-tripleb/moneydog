import React, {Component} from 'react';

import Calendar from './Calendar';
import Categories from './Categories';
import TotalAmount from './TotalAmount';
import List from './List';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import * as service from './dashboard.ajax';

import 'babel-polyfill';
import './dashboard.css';
import * as actions from '../../actions/auth';
import {connect} from 'react-redux';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state= {user: null, selectedValue: null};
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
    const loggedEmail = jwtDecode(this.props.token).param;
    console.log(`login email : ${loggedEmail}`);
    this.fetchUserInfo(loggedEmail);
  }

  fetchUserInfo = async (email) => {
    const response = await service.getUserByEmail(email);
    this.setState({
      user: response.data,
    });
  };

  render() {
    return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {/* 달력*/}
                <div className="calendar">
                  <Calendar date={this.state.selectedValue} handleChange={this.handleChange} data={this.state.user}/>
                </div>
                <hr/>
                <div className="list">
                  <List date={this.convertDate()} data={this.state.user} />
                </div>
              </div>
              {/* 구독중인 서비스 list */}
              <div className="col-md-6">
                <div className='TotalAmount'>
                  <TotalAmount data={this.state.user}/>
                </div>
                <hr/>
                <div className='categories'>
                  <Categories data={this.state.user}/>
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
  // token: state.auth.status.JWT,
});

// get action
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
