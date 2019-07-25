import React, { Component } from 'react';

class Home extends Component {
  state = {
    text: 'Home Page',
  };

  render() {
    return (
      <>
        <div>
          <h1>{this.state.text}</h1>
        </div>
      </>
    );
  }
}

export default Home;
