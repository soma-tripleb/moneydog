import React, {Component} from 'react';
import {PageHeader, Button, Statistic, Row, Col, Card} from 'antd';


class Categories extends Component {

  state = {

  };


  render() {

    //TODO :: ajax 로 data를 받아와서 처음에 null 값 error 가뜸 이곳에 스피너 같은거 넢어 주어야함
    if(this.props.data == null ){
      return <></>
    }

    return (
        <div>
          {/*  구독 중인 서바스*/}
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

            {this.props.data.map((data,index)=>{
              return (
                  <Card key={index} type="inner" title={data.serviceName} extra={<a href="#">More</a>}>
                    <div className="extraContent">
                      <Row>
                        <Col span={12}>
                          <Statistic title="D-Day" value={data.paymentDay}/>
                        </Col>
                        <Col span={12}>
                          <Statistic title="Price" prefix="₩" value={data.price}/>
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
