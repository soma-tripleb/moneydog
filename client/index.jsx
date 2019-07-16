import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.less';

class Index extends Component {

  state = {
    text: "hello, webpack!",
  };

  render() {
    return (
        <>
          <h1>{this.state.text}</h1>

          <div>
            <Row>
              <Col span={12}>col-12</Col>
              <Col span={12}>col-12</Col>
            </Row>
          </div>
        </>
    );
  }

}

export default Index;
