import React, { Component } from 'react';

import Carousel from '../component/index/Carousel';

class Home extends Component {
  state = {
    text: 'Home Page',
  };

  render() {
    return (
      <>
        <h1>{this.state.text}</h1>
      </>
    );
  }
}

export default Home;
