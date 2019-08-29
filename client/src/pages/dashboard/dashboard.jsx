import React, {Component} from 'react';

import Calendar from './Calendar';
import Categories from './Categories';
import TotalAmount from './TotalAmount';
import List from './List';


import * as service from './dashboard.ajax';

import 'babel-polyfill';
import './dashboard.css';

class DashBoard extends Component {

  state = {
    user: null,
  };

  // Component Life Cycle
  componentDidMount() {
    this.fetchUserInfo('jimmyjaeyeon@gmail.com');
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
                {/*달력*/}
                <div className="calendar">
                  <Calendar/>
                </div>
                <hr/>
                <div className="list">
                  <List/>
                </div>
              </div>
              {/*구독중인 서비스 list */}
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
              <p>DashBoard</p>
            </footer>
          </div>
        </>
    );
  }
}

export default DashBoard;
