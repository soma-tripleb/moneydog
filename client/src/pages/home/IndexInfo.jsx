import React, {Component} from 'react';

class IndexInfo extends Component {
  render() {
    return (
      <>
        {/* 우리 서비스의 목표 */}
        <div className="container marketing">

          <div className="row index-wrap">

            <div className="col-lg-4 index-item">
              <img src={`${process.env.REACT_APP_IMAGE_URI}/img/dashboard.png`} alt="Generic placeholder image"/>
              <h2>Management</h2>
              <p>구독 정보를 관리 할 수 있습니다. Mail 또는 Message 를 통해 한번의 클릭으로 자신이 어떤 서비스에 가입 되어 있는지 확인 할 수 있습니다. Google Login 을 통해 가입 해보세요 .</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
            </div>

            <div className="col-lg-4 index-item">
              <img src={`${process.env.REACT_APP_IMAGE_URI}/img/report.png`} alt="Generic placeholder image"/>
              <h2>Report</h2>
              <p>사용자에게 report 를 보내 드립니다. report 에는 사용자들이 서비스를 잘 사용하고 있는지, 총 얼마의 금액을 결제했는지 등의 정보를 알려줍니다.</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
            </div>

            <div className="col-lg-4 index-item">
              <img src={`${process.env.REACT_APP_IMAGE_URI}/img/subscribe.png`} alt="Generic placeholder image"/>
              <h2>Recomend</h2>
              <p>경제적인 구독전략을 제시해 줍니다. 사용자가 스마트한 소비를 할 수 있도록 도와 드립니다.</p>
              <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
            </div>
          </div>

        </div>

      </>
    );
  }
}

export default IndexInfo;
