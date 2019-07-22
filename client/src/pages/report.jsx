import React, { Component } from 'react';

class Report extends Component {

  state = {
    title: 'Report page',
  };

  render() {
    return (
      <>
        <div>
          <h1>{this.state.title}</h1>
        </div>
      </>
    );
  }
}

export default Report;
