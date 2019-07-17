import React, {Component} from 'react';
import {Row, Button, Col, Breadcrumb, Menu, Icon, Layout} from'antd';
import 'antd/dist/antd.less';
const {Sider, Content, Footer, Header} = Layout; // import를 어떻게 활용해야될지 모르겠다.
const {SubMenu} = Menu;

class Info extends Component {
  state = {
    text: 'Info default text',
    collapsed: false,
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Report</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="unordered-list" />
                  <span>Service</span>
                </span>
              }
            >
              <Menu.Item key="3">Netflix</Menu.Item>
              <Menu.Item key="5">Watch</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <Row>
  //         <Col span={6}><h1>Col-6</h1></Col>
  //         <Col span={12}><h1>Col-12</h1></Col>
  //         <Col span={6}><h1>Col-6</h1></Col>
  //       </Row>
  //     </div>
  //   )
  // }
}

export default Info;
