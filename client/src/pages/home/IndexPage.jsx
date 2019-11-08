import React, { Component } from 'react';
import Carousel from './Carousel';

class IndexPage extends Component {


  render() {
    return (
      <>
        <div className="row">
          <div className="col IndexPage-inner align-self-center text-center">
            <div className="col-md-8 IndexPage-margin">
              <div className="row IndexPage-margin">
                <img className="IndexPage-img" src={`${process.env.REACT_APP_IMAGE_URI}/img/MDMintIcon.png`}/>
                <div className="col-6 text-left align-self-center">
                  <div className="col IndexPage-md">
                    MoneyDog
                  </div>
                  <div className="col IndexPage-md-sub">
                    구독 매니저
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 IndexPage-margin">
              <div className="col IndexPage-serviceValue text-left">
                  Money Dog 은 사용자의 구독을 추적 하고
                  구독 정보들을 한눈에 보여주고
                  알림을 통해 경제적인 구독 전략을 제시하는 서비스 입니다.
              </div>
            </div>
          </div>
          <div className="col-sm IndexPage-inner align-self-center">
            <Carousel/>
          </div>
        </div>
      </>
    );
  }
}

export default IndexPage;
