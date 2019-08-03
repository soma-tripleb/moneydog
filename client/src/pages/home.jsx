import React, {Component} from 'react';

import { Carousel, IndexInfo, GmailTutorial, IndexSignUp} from '../component/index/index';

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