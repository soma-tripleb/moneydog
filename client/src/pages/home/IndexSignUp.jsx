import React, {Component} from 'react';

class IndexSignUp extends Component {

  render() {
    return (
        <>
          <div className="container marketing">
            <div className="row featurette">
              <div className="col-md-7 order-md-2">
                <h2 className="featurette-heading">회원 가입하러 가기
                </h2>
                <p className="lead">회원 가입 이후 서비스를 무료로 사용해 보세요. !</p>
              </div>
              <div className="col-md-5 order-md-1">
                <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto"
                     alt="Generic placeholder image"/>
              </div>
            </div>
          </div>

        </>
    );
  }
}

export default IndexSignUp;
