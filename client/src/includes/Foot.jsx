import React, {Component} from 'react';

import './css/footer.css';

class Foot extends Component {
  render() {
    return (
      <>
        <footer className="mainfooter" role="contentinfo">
          <div className="footer-middle">
            <div className="container">
              <div className="row">


              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col footer-pad">
                      사용자 그룹
                    </div>
                    <div className="col footer-pad">
                      서비스 문의
                    </div>
                    <div className="col footer-pad">
                      제휴 문의
                    </div>
                    <div className="col footer-pad">
                      이용 약관
                    </div>
                    <div className="col footer-pad">
                      공지 사항
                    </div>
                    <div className="col footer-pad">
                      개인 정보 취급 방침
                    </div>
                  </div>
                </div>
                <div className="col">
                  <p className="text-xs-center text-right">Copyright &copy; Triple-B All rights reserved. </p>
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
