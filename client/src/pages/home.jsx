import React, {Component} from 'react';

import Carousel from '../component/index/Carousel';
import IndexInfo from '../component/index/IndexInfo';
import GmailTutorial from '../component/index/GmailTutorial';
import IndexSignUp from '../component/index/IndexSignUp';


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
