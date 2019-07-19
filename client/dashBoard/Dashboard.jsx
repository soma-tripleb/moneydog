import React, {Component} from 'react';
import {Menu, Input, Button, Row, Col, Card, Avatar, PageHeader, Layout, Breadcrumb,Icon} from 'antd';

import Calendar from './Calendar';
import Cate from './Categorie';

const {Header, Footer, Sider, Content} = Layout;

class Categorie extends Component {

  render() {
    return (
        <>
          <Layout className="layout">
            <Header>
              <div className="logo"/>
              <h1
                  style={{lineHeight: '64px', color: '#fff'}}
              >
                MONEY DOG
              </h1>

            </Header>

            <Content style={{padding: '0 50px'}}>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>MoneyDog</Breadcrumb.Item>
                <Breadcrumb.Item> App List</Breadcrumb.Item>
              </Breadcrumb>

              <Calendar/>

              <Cate/>


            </Content>

            <Footer style={{textAlign: 'center'}}>
              <Button type="link" size="large" ghost>
                <Icon type="home" theme="twoTone" />
              </Button>
              <Button type="link" size="large" ghost>
                <Icon type="bars" twoToneColor="#eb2f96"/>
              </Button>
              <Button type="link" size="large" ghost>
                <Icon type="smile" theme="twoTone" />
              </Button>
              <Button type="link" size="large" ghost>
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
              </Button>
              <Button type="link" size="large" ghost>
                <Icon type="bar-chart"  twoToneColor="#eb2f96"/>
              </Button>
            </Footer>

          </Layout>
        </>
    );
  }
}

export default Categorie;
