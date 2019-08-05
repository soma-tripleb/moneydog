import React, {Component} from 'react';
import {PageHeader, Button, Statistic, Row, Col, Card} from 'antd';


class Categories extends Component {

  state = {
    userSubscribeeData : [
      {name: 'melon', price:'6500', Dday:"17"},
      {name: 'netflex', price:'9800', Dday:"28"},
      {name: 'watch', price:'5600', Dday:"5"},
    ]
  };



  render() {
    return (
        <div>
          {/*  구독 중인 서바스*/}
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

            {this.state.userSubscribeeData.map((ssData,index)=>{
              return (
                  <Card key={index} type="inner" title={ssData.name} extra={<a href="#">More</a>}>
                    <div className="extraContent">
                      <Row>
                        <Col span={12}>
                          <Statistic title="D-Day" value={ssData.Dday}/>
                        </Col>
                        <Col span={12}>
                          <Statistic title="Price" prefix="₩" value={ssData.price}/>
                        </Col>
                      </Row>
                    </div>
                  </Card>
              )
            })}


          </div>
          <br/>

          <Button type="primary" block>
            Add a new Service
          </Button>
        </div>
    );
  }
}

export default Categories;
