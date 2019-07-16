import React ,{ Component } from 'react';

class Index extends Component {
  state = {
    text: "hello, webpack!",
  };

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

export default Index;
