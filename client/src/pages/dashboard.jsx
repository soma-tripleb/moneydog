import React, { Component } from 'react';

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
        <Content>
          <Calendar />
          <Categories />
        </Content>
      </>
    );
  }
}

export default Dashboard;