import React, {Component} from 'react';
require('dotenv').config();

class SubsApp extends Component {
  handleClick = () => {
    const {subsAppInfo, onDelete, onInsert} = this.props;

    if (subsAppInfo.label === '-') {
      onDelete(subsAppInfo.seq, subsAppInfo.logoURI, subsAppInfo.name);
    } else {
      onInsert(subsAppInfo.seq, subsAppInfo.logoURI, subsAppInfo.name);
    }
  };

  render() {
    const {subsAppInfo} = this.props;
    return (
      <>
        <div className="container w-100" id="inner-element">
          <div className="row">
            <div className="col">
              <img className="logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />
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
