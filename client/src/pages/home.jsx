import React, { Component } from 'react';

import Carousel from '../component/index/Carousel';

class Home extends Component {
  state = {
    text: 'Home Page',
  };

  render() {
    return (
      <>
        <div>
          <Carousel/>
        </div>
      </>
    );
  }
}

export default Home;
