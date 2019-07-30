import React, {Component} from 'react';

import face1 from '../../static/img/pangju.jpeg';
import face2 from '../../static/img/pangju.jpeg';
import face3 from '../../static/img/pangju.jpeg';

import '../../static/style/component/index/carosel.css';

class Carousel extends Component {

  render() {
    return (
        <>
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-50" src={face1}
                     alt="First slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-50 img-responsive" src="https://c1.staticflickr.com/5/4304/35907213446_c81f70eb39_c.jpg"
                     alt="Second slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-50" src="https://c1.staticflickr.com/5/4330/35861245381_a81bf54a45_c.jpg"
                     alt="Third slide"/>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

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

            <hr className="featurette-divider"/>

            {/*Gmail*/}

            <div className="row featurette">
              <div className="col-md-7">
                <h2 className="featurette-heading"> 자신의 Mail을 이용해 구독 정보를 조회 해보세요.
                </h2>
                <p className="lead">
                  <form className="form-inline" role="form">
                    <input type="text" className="form-control" placeholder="Mail ID input"/>
                    <button type="submit" >검색하기</button>

                  </form>
                </p>
              </div>
              <div className="col-md-5">
                <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto"
                     alt="Generic placeholder image"/>
              </div>
            </div>

            <hr className="featurette-divider"/>

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

              <hr className="featurette-divider"/>

          </div>

        </>
    );
  }
}

export default Carousel;
