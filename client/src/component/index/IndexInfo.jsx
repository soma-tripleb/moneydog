import React, {Component} from 'react';

class IndexInfo extends Component {

  render() {
    return (
        <>
          {/* 우리 서비스의 목표 */}
          <div className="container marketing">

            <div className="row">
              <div className="col-lg-4">
                <img className="rounded-circle"
                     src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                     alt="Generic placeholder image" width="140" height="140"/>
                <h2>Show it at once</h2>
                <p>구독 정보를 한눈에 보여줍니다.</p>
                <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
              </div>
              <div className="col-lg-4">
                <img className="rounded-circle"
                     src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                     alt="Generic placeholder image" width="140" height="140"/>
                <h2>Tracking</h2>
                <p>사용량을 분석해 줍니다</p>
                <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
              </div>
              <div className="col-lg-4">
                <img className="rounded-circle"
                     src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                     alt="Generic placeholder image" width="140" height="140"/>
                <h2>Recomend</h2>
                <p>경제적인 구독전략을 제시해 줍니다.</p>
                <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
              </div>
            </div>

          </div>

        </>
    );
  }
}

export default IndexInfo;
