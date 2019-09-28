import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import dashboard from '../../../resources/static/img/index/dashboard.png';

class IndexSignUp extends Component {
  render() {
    return (
        <>
          <div className="container marketing">
            <div className="row featurette">
              <div className="col-md-7 order-md-2">
                <h2 className="featurette-heading">
                  회원 가입 이후 서비스를 무료로 사용해 보세요. ! 당신의 스마트한 소비를 도와드립니다.
                </h2>
                <Link to="/signup" className="nav-link">
                  회원가입 하러 가기.
                </Link>
              </div>
              <div className="col-md-5 order-md-1">
                <img className="featurette-image img-fluid mx-auto" src={dashboard}
                  alt="Generic placeholder image"/>
              </div>
            </div>
          </div>

        </>
    );
  }
}

export default IndexSignUp;
