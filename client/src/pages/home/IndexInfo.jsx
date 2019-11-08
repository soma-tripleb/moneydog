import React, {Component} from 'react';

class IndexInfo extends Component {
  render() {
    return (
      <>
        {/* 우리 서비스의 목표 */}
        <div className="container marketing">

          <div className="row index-wrap">

            <div className="col-lg-4 index-item">
              <img src={`${process.env.REACT_APP_IMAGE_URI}/img/calendar.png`} alt="Generic placeholder image"/>
              <div className="indexInfo-title">구독 관리</div>
              <div className="indexInfo-text">구독 정보가 언제 갱신되고 얼마가 나가는지 한눈에 관리 할 수 있습니다.</div>
            </div>

            <div className="col-lg-4 index-item">
              <img src={`${process.env.REACT_APP_IMAGE_URI}/img/smartphone.png`} alt="Generic placeholder image"/>
              <div className="indexInfo-title">알림</div>
              <div className="indexInfo-text">사용자에게 리포트를 보내 드립니다. 사용자는 구독서비스가 결제 되기전에 알 수 있습니다.</div>
            </div>

            <div className="col-lg-4 index-item">
              <img src={`${process.env.REACT_APP_IMAGE_URI}/img/pig.png`} alt="Generic placeholder image"/>
              <div className="indexInfo-title">알림</div>
              <div className="indexInfo-text">경제적인 구독전략을 제시해 줍니다. 사용자가 스마트한 소비를 할 수 있도록 도와 드립니다.</div>
            </div>
          </div>

        </div>

      </>
    );
  }
}

export default IndexInfo;
