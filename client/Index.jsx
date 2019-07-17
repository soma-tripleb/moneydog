import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.less';

class Index extends Component {
  state = {
    text: 'Hello world',
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={12}>col-12</Col>
          <Col span={6}>col-6</Col>
        </Row>
        <h1>{this.state.text}</h1>
        <Button icon='login' type='primary'>Button</Button>
      </div>
    );
  }
}

export default Index;


