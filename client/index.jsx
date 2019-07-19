import React, {Component} from 'react';
import {Row, Col} from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.less';

class Index extends Component {
  state = {
    text: 'hello,!',
  };

  render() {
    return (
        <>
          <div>
            <Row>
              <Col span={6}></Col>

              <Col span={12}>

                <div>
                  <h1>{this.state.text}</h1>
                </div>

                <div>
                  <ul>
                    <li><Link to="dashboard">dashboard</Link></li>
                    <li><Link to="report">info</Link></li>
                    <li><Link to="report">report</Link></li>
                  </ul>
                </div>

              </Col>

              <Col span={6}></Col>
            </Row>
          </div>
        </>
    )
  }
}

export default Index;
