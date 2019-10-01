import React, {Component} from 'react';

import dashboard from '../../../resources/static/img/index/dashboard.png';
import report from '../../../resources/static/img/index/report.png';
import subscribe from '../../../resources/static/img/index/subscribe.png';

class Carousel extends Component {
  render() {
    return (
      <>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"/>
          </ol>
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <img className="d-block w-100" src={dashboard}
                alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={report}
                alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={subscribe}
                alt="First slide"/>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"/>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"/>
            <span className="sr-only">Next</span>
          </a>
        </div>

      </>
    );
  }
}

export default Carousel;
