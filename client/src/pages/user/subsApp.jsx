import React, { Component } from 'react';

class SubsApp extends Component {
  state = {
    number: this.props.number,
    logo: this.props.logo,
    title: this.props.title,
  };

  handleClick = (e) => {
    this.props.onInsert('testdata');
  }

  render() {
    const { subsAppInfo } = this.props;

    return (
      <div className="w-100 p-3" id="subs-inner-left-element" onClick={this.handleClick.bind(this)}>
        <p>{subsAppInfo.number}&nbsp;&nbsp;{subsAppInfo.logo}&nbsp;&nbsp;{subsAppInfo.title}</p>
      </div>
    )
  }
}

export default SubsApp;