import React, {Component} from 'react';

import face1 from '../../static/img/pangju.jpeg';

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
                <img className="d-block w-50 img-responsive"
                     src="https://c1.staticflickr.com/5/4304/35907213446_c81f70eb39_c.jpg"
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

        </>
    );
  }
}

export default Carousel;
