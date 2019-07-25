import React, {Component} from 'react';
import { Layout, Breadcrumb } from 'antd';

import Calendar from '../component/dashboard/Calendar';
import Cate from '../component/dashboard/Categorie';

const { Content } = Layout;

class Dashboard extends Component {

  render() {
    return (
        <>

            <Content style={{padding: '0 50px'}}>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>MoneyDog</Breadcrumb.Item>
                <Breadcrumb.Item> App List</Breadcrumb.Item>
              </Breadcrumb>

              <Calendar/>

              <Cate/>


            </Content>


        </>
    );
  }
}

export default Dashboard;
