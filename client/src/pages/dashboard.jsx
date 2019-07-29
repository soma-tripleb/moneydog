import React, {Component} from 'react';
import { Layout, Breadcrumb } from 'antd';

import Calendar from '../component/dashboard/Calendar';
import Categories from '../component/dashboard/Categories';

const { Content } = Layout;

class Dashboard extends Component {

  render() {
    return (
        <>
            <Content>
              <Calendar/>
              <Categories/>
            </Content>
        </>
    );
  }
}

export default Dashboard;