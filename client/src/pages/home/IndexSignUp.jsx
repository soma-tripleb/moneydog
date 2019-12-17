import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IndexSignUp extends Component {
  render() {
    return (
      <>
        <div className="container marketing">
          <div className="row featurette">
            <div className="col-md order-md-2 align-self-center">
              <div className="featurette-heading">
                <div>이제 더 이상 걱정없이 정기구독하세요.</div>
                <div>머니독이 알아서 지갑을 지켜드립니다.</div>
                <div>똑똑한 디지털 소비를 위한 구독 전략 파트너,</div>
                <div>머니독을 지금 바로 경험하세요</div>
              </div>
              <Link to="/signup" className="nav-link startBtn-padding">
                <button onClick={this.previousHandleSubmit} type="button" className="btn btn-dark btn-start"> 시작하기 </button>
              </Link>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default IndexSignUp;
