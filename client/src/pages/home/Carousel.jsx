import React, {Component} from 'react';

import dashboard from '../../static/img/templogo/dashboard.png';
import report from '../../static/img/templogo/report.png';
import subscribe from '../../static/img/templogo/subscribe.png';

import './carosel.css';

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
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-50" src={dashboard}
                  alt="First slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-50" src={report}
                  alt="First slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-50" src={subscribe}
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
