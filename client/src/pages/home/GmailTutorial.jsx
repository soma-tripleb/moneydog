import React, {Component} from 'react';

class GmailTutorial extends Component {
  render() {
    return (
      <>
        {/* Gmail*/}
        <div className="container marketing">

          <div className="row featurette">
            <div className="col-md-7">

              <h2 className="featurette-heading">
                  자신의 Mail을 이용해 구독 정보를 조회 해보세요.
              </h2>

              <form className="form-inline" role="form">
                <input type="text" className="form-control" placeholder="Mail ID input"/>
                <button type="submit">검색하기</button>
              </form>

            </div>
            <div className="col-md-5">
              <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto"
                alt="Generic placeholder image"/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GmailTutorial;
