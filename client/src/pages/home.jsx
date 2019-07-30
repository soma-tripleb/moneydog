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
          <div>

            <Carousel/>

            <hr className="featurette-divider"/>

            <IndexInfo/>

            <hr className="featurette-divider"/>

            <GmailTutorial/>

            <hr className="featurette-divider"/>

            <IndexSignUp/>

          </div>
        </>
    );
  }
}

export default Home;
