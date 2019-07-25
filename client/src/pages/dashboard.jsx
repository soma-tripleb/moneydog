import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';

import Calendar from '../component/dashboard/Calendar';
import Categories from '../component/dashboard/Categories';

const { Content} = Layout;

class DashBoard extends Component {

  render() {
    return (
        <>

            <Content style={{padding: '0 50px'}}>

              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>MoneyDog</Breadcrumb.Item>
                <Breadcrumb.Item> App List</Breadcrumb.Item>
              </Breadcrumb>

              <Calendar/>
              <Categories/>

            </Content>

        </>
    );
  }
}

export default DashBoard;
