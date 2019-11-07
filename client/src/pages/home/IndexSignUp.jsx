import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class IndexSignUp extends Component {
  render() {
    return (
      <>
        <div className="container marketing">
          <div className="row featurette">
            <div className="col-md-7 order-md-2 align-self-center">
              <div className="featurette-heading">
                  한번의 회원가입 절차로 당신의 마음을 편하게 만들어 보세요.
                당신의 스마트한 소비를 도와드립니다.
              </div>
              <Link to="/signup" className="nav-link">
                <button onClick={this.previousHandleSubmit} type="button" className="btn btn-outline-dark btn-margin-10"> MoneyDog 시작하기 </button>
              </Link>
            </div>
            <div className="col-md-5 order-md-1">
              <img className="featurette-image img-fluid mx-auto" src={`${process.env.REACT_APP_IMAGE_URI}/img/iphone3.png`}
                alt="Generic placeholder image"/>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default IndexSignUp;
