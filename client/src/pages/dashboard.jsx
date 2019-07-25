import React, {Component} from 'react';
import {Menu, Input, Button, Row, Col, Card, Avatar, PageHeader, Layout, Breadcrumb,Icon} from 'antd';

import Calendar from '../component/dashboard/Calendar';
import Cate from '../component/dashboard/Categorie';

const {Header, Footer, Content} = Layout;

class Categorie extends Component {

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

export default Categorie;
