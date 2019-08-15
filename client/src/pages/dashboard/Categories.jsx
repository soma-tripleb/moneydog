import React, {Component} from 'react';
import {PageHeader, Button, Statistic, Row, Col, Card} from 'antd';

class Categories extends Component {
  state = {};

  render() {
    //TODO :: ajax 로 data를 받아와서 처음에 null 값 error 가뜸 이곳에 스피너 같은거 넢어 주어야함
    if (this.props.data == null) {
      return (
          <>
          </>
      )
    }

    return (
        <div>
          {/*  구독 중인 서비스*/}
          <p><u> 구독 중인 서비스 </u></p>
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
            {this.props.data.map((data, index) => {
              return (
                  <div key={index} className="container w-100 p-3" id="inner-element">
                    <div className="row">
                      <div className="col">
                        <img src="" alt={data.serviceName} style={{height: '2vh', borderRadius: '5px'}}/>
                      </div>
                      <div className="col">
                        <button>
                          8월 {data.paymentDay}일
                        </button>
                      </div>

                      <div className="col">
                        ₩ {data.price}
                      </div>
                    </div>
                  </div>
              )
            })}
            {this.props.data.map((data, index) => {
              return (
                  <div key={index} className="container w-100 p-3" id="inner-element">
                    <div className="row">
                      <div className="col">
                        <img src="" alt={data.serviceName} style={{height: '2vh', borderRadius: '5px'}}/>
                      </div>
                      <div className="col">
                        <button>
                          8월 {data.paymentDay}일
                        </button>
                      </div>

                      <div className="col">
                        ₩ {data.price}
                      </div>
                    </div>
                  </div>
              )
            })}
            {this.props.data.map((data, index) => {
              return (
                  <div key={index} className="container w-100 p-3" id="inner-element">
                    <div className="row">
                      <div className="col">
                        <img src="" alt={data.serviceName} style={{height: '2vh', borderRadius: '5px'}}/>
                      </div>
                      <div className="col">
                        <button>
                          8월 {data.paymentDay}일
                        </button>
                      </div>

                      <div className="col">
                        ₩ {data.price}
                      </div>
                    </div>
                  </div>
              )
            })}
          </div>
          <br/>
        </div>
    );
  }
}

export default Categories;
