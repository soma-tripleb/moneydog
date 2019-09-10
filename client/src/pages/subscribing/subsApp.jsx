import React, {Component} from 'react';

import './subsApp.css';

class SubsApp extends Component {
  state = {
    number: this.props.number,
    logo: this.props.logo,
    name: this.props.name,
    label: this.props.label,
  };

  handleClick = () => {
    const {subsAppInfo} = this.props;

    if (subsAppInfo.label === '-') {
      this.props.onDelete(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
    } else {
      this.props.onInsert(subsAppInfo.number, subsAppInfo.logo, subsAppInfo.name);
    }
  };

  handlePopup = () => {
    this.props.onPopup(this.props.subsAppInfo);
  }

  render() {
    const {subsAppInfo} = this.props;

    return (
      <>
        <div className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              <button onClick={this.handleClick.bind(this)}>
                {subsAppInfo.label}
              </button>
            </div>
            <div className="col">
              <img className="logo-img" src={subsAppInfo.logo} alt="x" style={{height: '5vh', borderRadius: '5px'}} />
            </div>
            <div className="col">
              {subsAppInfo.name}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SubsApp;
