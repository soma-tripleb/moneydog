import React, { Component, createRef } from 'react';

import '../../static/style/component/user/subs-app.css';

import face1 from '../../static/img/pangju.jpeg';

class SubsApp extends Component {
  state = {
    number: this.props.number,
    logo: this.props.logo,
    name: this.props.name,
    label: this.props.label,
  };

  handleClick = () => {
    const { subsAppInfo } = this.props;

    if (subsAppInfo.label === '-') {
      this.props.onDelete(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
    } else {
      this.props.onInsert(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
    }

  }

  render() {
    const { subsAppInfo } = this.props;

    return (
      <div className="container w-100 p-3" id="subs-inner-left-element" style={{marginBottom: 12, border: '2px black', backgroundColor: '#eef', boxShadow: '3px 3px 3px 3px gray'}}>
        {/* <p className="subs-app-info">{subsAppInfo.number}&nbsp;&nbsp;{subsAppInfo.logo}&nbsp;&nbsp;{subsAppInfo.name}</p> */}
         <div class="row">
          <button onClick={this.handleClick.bind(this)} style={{border: 'none', backgroundColor: '#eef'}}>
            {subsAppInfo.label}
          </button>
          <div class="col">
            {subsAppInfo.number}
          </div>
          <div class="col-5">
            <img src={face1} alt={subsAppInfo.logo}/>
          </div>
          <div class="col">
            {subsAppInfo.name}
          </div>
        </div>
      </div>
    )
  }
}

export default SubsApp;