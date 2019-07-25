import React, { Component } from 'react';

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
