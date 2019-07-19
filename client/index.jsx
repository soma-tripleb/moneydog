import React, {Component} from 'react';
import Categorie from './dashBoard/dashboard';
import 'antd/dist/antd.less';
import {Col, Layout, Menu, Row} from "antd";

class Index extends Component {
  state = {
    text: 'index.',
  };

  render() {
    return (
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Categorie />
          </Col>
          <Col span={6}></Col>
        </Row>
    );
  }
}

export default Index;
