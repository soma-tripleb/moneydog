import React, {Component} from 'react';
import {PageHeader, Button } from 'antd';

import Netflix from '../../static/img/templogo/netflix.png';
import Melon from '../../static/img/templogo/melon.png';
import Tving from '../../static/img/templogo/tving.png';
import Watcha from '../../static/img/templogo/watcha.png';

class Categories extends Component {
  state = {

  };

  arr = {
    netflix: Netflix,
    Melon: Melon,
    "watcha": Watcha,
    TVING: Tving,
  };

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
            {this.props.data.subscriptions.map((data, index) => {
              return (
                  <div key={index} className="container w-100 p-3" id="inner-element">
                    <div className="row">
                      <div className="col">
                        {/*<img src={data.serviceName} alt={data.serviceName} style={{height: '5vh', borderRadius: '5px'}}/>*/}
                        <img src={this.arr[data.name]} alt={data.name} style={{height: '5vh', borderRadius: '5px'}}/>
                      </div>
                      <div className="col">
                          {data.name}
                      </div>
                      <div className="col">
                        <button>
                          {data.date}
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
