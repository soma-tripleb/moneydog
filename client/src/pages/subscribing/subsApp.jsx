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
      this.props.onDelete(subsAppInfo.seq, subsAppInfo.logo, subsAppInfo.name);
    } else {
      this.props.onInsert(subsAppInfo.seq, subsAppInfo.logo, subsAppInfo.name);
    }
  };

  render() {
    const {subsAppInfo} = this.props;

    return (
      <>
        <div className="container w-100 p-3" id="inner-element">
          <div className="row">
            <div className="col">
              <img className="logo-img" src={`/` + subsAppInfo.logo} alt="x" />
            </div>
            <div className="col">
              {subsAppInfo.name}
            </div>
            <div className="col">
              <button onClick={this.handleClick}>
                {subsAppInfo.label}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SubsApp;
