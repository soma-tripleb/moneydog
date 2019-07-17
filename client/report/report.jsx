import React, {Component} from 'react';
import { Row, Col } from 'antd';

import 'antd/dist/antd.less';

class Report extends Component {

  state = {
    title: 'Report page',
  };

  render() {
    return (
        <>
          <div>

            <Row>
              <Col span={6}></Col>

              <Col span={12}>
                <div>
                  <h1>{this.state.title}</h1>
                </div>
              </Col>

              <Col span={6}></Col>
            </Row>

          </div>
        </>
    )
  }
}

export default Report;
