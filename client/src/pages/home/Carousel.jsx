import React, {Component} from 'react';

class Carousel extends Component {
  render() {
    return (
      <>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
            <li data-target="#carouselExampleIndicators" data-slide-to="0"/>
          </ol>
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
