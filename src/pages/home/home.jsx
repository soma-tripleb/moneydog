import React, {Component} from 'react';

import {Carousel, IndexInfo, IndexSignUp} from './index';
import './home.css';

class Home extends Component {
  render() {
    return (
      <>
        <div className="container homwWrap">

          <Carousel/>

          <hr className="featurette-divider"/>

          <IndexInfo/>

          <hr className="featurette-divider"/>

          <IndexSignUp/>

        </div>
      </>
    );
  }
}

export default Home;
