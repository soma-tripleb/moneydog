import React, {Component} from 'react';

import { Carousel, IndexInfo, GmailTutorial, IndexSignUp} from './index';

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
