import React, {Component} from 'react';
import {Row, Statistic, Card, Col, Icon, Progress, Layout, Button} from'antd';
const {Header, Footer, Sider, Content} = Layout;

import 'antd/dist/antd.less';

class Info extends Component {
  state = {
    name: 'Netflix',
    category : 'entertainment',
    plans: [
      {
        name: 'basic',
        quality: '480p',
        hdr: false,
        screens: 1,
      },
      {
        name: 'standard',
        quality: 'HD',
        hdr: false,
        screens: 2,
      },
      {
        name: 'premium',
        quality: '4K',
        hdr: true,
        screens: 4,
      },
    ]
  }

  render() {
    return (
      <Row>
        <Col span={6}><h3>Empty Area</h3></Col>
        <Col span={12}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Layout>
              <Header>
                <h1 style={{lineHeight: '64px', color: '#fff'}}></h1>
              </Header>
            </Layout>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <div>
                <h5>지난달의 사용량</h5><Progress percent={30} />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
              </div>
              <h4>Usage</h4>
              <div>
                <Progress type="circle" percent={75} />
                <Progress type="circle" percent={70} status="exception" />
                <Progress type="circle" percent={100} />
              </div>
              <Row gutter={12}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Active"
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<Icon type="arrow-up" />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Idle"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: '#cf1322' }}
                      prefix={<Icon type="arrow-down" />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <h4>content part</h4>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    <Button style={{ marginTop: 16 }} type="primary">
                      Recharge
                    </Button>
                  </Col>
                </Row>
              </Row>
            </div>
          </div>
        </Col>

        /* right empty area */
        <Col span={6}><h3>Empty Area</h3></Col>
      </Row>
    )
  }
}

export default Info;
