import React, {Component} from 'react';
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col ,Card } from 'antd';

const { TabPane } = Tabs;

class Cate extends Component {


  render() {
    return (
        <div>
          {/*<Button type="primary" block>*/}
          {/*  구독 중인 서바스*/}
          {/*</Button>*/}
          <hr/>
          <PageHeader title="구독 중인 서비스"
                      extra={[
                        <Button key="2">
                          가격 순
                        </Button>,
                        <Button key="1" type="primary">
                          남은 일
                        </Button>,
                      ]}>
          </PageHeader>
          <br/>

          <div>
            <Card type="inner" title="Melon" extra={<a href="#">More</a>}>
              <div className="extraContent">
                <Row>
                  <Col span={12}>
                    <Statistic title="D-Day" value="D-17" />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Price" prefix="₩" value={6500} />
                  </Col>
                </Row>
              </div>
            </Card>
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="NetFlix"
                extra={<a href="#">More</a>}
            >
              <div className="extraContent">
                <Row>
                  <Col span={12}>
                    <Statistic title="D-Day" value="D-3" />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Price" prefix="₩" value={9500} />
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
          <br/>

          <Button type="primary" block>
            Add a new Service
          </Button>
        </div>
    );
  }
}

export default Cate;
