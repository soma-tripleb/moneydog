import React, { Component } from 'react';
import Carousel from './Carousel';

class IndexPage extends Component {


  render() {
    return (
      <>
        <div className="row">
          <div className="col IndexPage-inner align-self-center text-center">
            <div className="col-md IndexPage-margin">
              <div className="col IndexPage-serviceValue text-left">
                <div className="col IndexPage-md-sub padding-zero">
                    이제 안심하고 구독하세요
                </div>
              </div>
            </div>
            <div className="col-md IndexPage-margin">
              <div className="col IndexPage-serviceValue text-left">
                <div>머니독은 디지털 정기 서비스 구독정보를</div>
                <div>손쉽게 관리하여 보다 경제적으로</div>
                <div>디지털 소비가 이루지도록 도와드립니다</div>
              </div>
            </div>
          </div>
          <div className="col-sm IndexPage-inner align-self-center">
            <img className="IndexPage-img" src={`${process.env.REACT_APP_IMAGE_URI}/img/imac.png`}/>
            {/* <Carousel/>*/}
          </div>
        </div>
      </>
    );
  }
}

export default IndexPage;
