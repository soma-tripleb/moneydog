import React, {Component} from 'react';

import Calendar from './Calendar';
import Categories from './Categories';

import * as service from './subscribeInfo';

import 'babel-polyfill';
import './dashboard.css';

class DashBoard extends Component {

  state = {
    data: null,
  };

  componentDidMount() {
    this.fetchPostInfo(1);
  }

  fetchPostInfo = async (postId) => {
    const response = await service.getUserServiceInfo(postId);
    this.setState({
      data: response.data,
    });
  };

  render() {
    console.log(this.state.data);
    return (
        <>
          <div className="container">
            <div className="row">
              <div className="col">
                {/*달력*/}
                <div className="calendar">
                  <Calendar/>
                </div>
                <hr/>
              </div>
              {/*구독중인 서비스 list */}
              <div className="col-md-6">
                <div className='categories'>
                  <Categories data={this.state.data}/>
                </div>
              </div>

            </div>

            <hr/>

            <footer>
              <p>DashBoard</p>
            </footer>
          </div>
        </>
    );
  }
}

export default DashBoard;
