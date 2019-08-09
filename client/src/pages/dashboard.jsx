import React, {Component} from 'react';

import Calendar from '../component/dashboard/Calendar';
import Categories from '../component/dashboard/Categories';

import * as service from '../services/subscribeInfo';

import 'babel-polyfill';

class DashBoard extends Component {

  state ={
    data:null,
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
              <div className="col-md-6">
                <h2>Calendar</h2>
                <Calendar/>
              </div>
              <div className="col-md-6">

                <Categories data={this.state.data}/>

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
