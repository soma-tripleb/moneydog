import React, {Component} from 'react';

import './footer.css';

class Foot extends Component {
  render() {
    return (
        <>
          <div className="m-t-3"/>
          <footer className="mainfooter" role="contentinfo">
            <div className="footer-middle">
              <div className="container">
                <div className="row">

                  <div className="col-md-2 col-sm-4">
                    <div className="footer-pad">
                      사용자 그룹
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-4 col-xs-2">
                    <div className="footer-pad">
                      서비스 문의
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-4">
                    <div className="footer-pad">
                      제휴 문의
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-4">
                    <div className="footer-pad">
                      이용 약관
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-4">
                    <div className="footer-pad">
                      공지 사항
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-4">
                    <div className="footer-pad">
                      개인 정보 취급 방침
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <p className="text-xs-center">&copy; Triple-B MONEYDOG</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </>
    );
  }
}

export default Foot;
