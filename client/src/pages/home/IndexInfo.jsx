import React, {Component} from 'react';

import subsManage from 'image/subsManage.png';

class IndexInfo extends Component {
  render() {
    return (
      <>
        {/* 우리 서비스의 목표 */}
        <div className="container marketing">

          <div className="row index-wrap">

            <div className="col-lg-4 index-item">
              <div className="index-item-inner">
                <img src={`${subsManage}`}/>
                <div className="indexInfo-title">구독 관리</div>
                <div className="indexInfo-text">
                  <div>어떤 앱들을 내가 구독하고 있는지 </div>
                  <div>언제, 얼마가 결제되고 있는지 </div>
                  <div>한눈에 관리할 수 있습니다</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 index-item">
              <div className="index-item-inner">
                <img src={`${process.env.REACT_APP_IMAGE_URI}/img/report.png`}/>
                <div className="indexInfo-title">리포트</div>
                <div className="indexInfo-text">
                  <div>사용자에게 리포트를 보내 드립니다. </div>
                  <div>사용자는 구독서비스가 결제 되기전에 </div>
                  <div>언제 얼마가 결제 되는지 알 수 있습니다.</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 index-item">
              <div className="index-item-inner">
                <img src={`${process.env.REACT_APP_IMAGE_URI}/img/smart.png`}/>
                <div className="indexInfo-title">스마트 소비</div>
                <div className="indexInfo-text">
                  <div>경제적인 구독전략을 제시해 줍니다. </div>
                  <div>사용자가 스마트한 소비를 할 수 </div>
                  <div> 있도록 도와 드립니다.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </>
    );
  }
}

export default IndexInfo;
