import React, { Component, createRef } from 'react';

import '../../static/style/component/user/subs-app.css';

class SubsApp extends Component {
  state = {
    number: this.props.number,
    logo: this.props.logo,
    name: this.props.name,
    label: this.props.label,
  };

  handleClick = () => {
    const {subsAppInfo} = this.props;
  
    this.props.onInsert(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
  }

  render() {
    const { subsAppInfo } = this.props;

    return (
      <div className="w-100 p-3" id="subs-inner-left-element">
        <button onClick={this.handleClick.bind(this)}>
          {subsAppInfo.label}
        </button>
        <p className="subs-app-info">{subsAppInfo.number}&nbsp;&nbsp;{subsAppInfo.logo}&nbsp;&nbsp;{subsAppInfo.name}</p>
      </div>
    )
  }
}

export default SubsApp;