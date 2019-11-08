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

  showSubscribeActionBtn = () => {
    if (this.props.subsAppInfo.label === '-') {
      return (<button onClick={this.handleClick} type="button" className="btn btn-outline-secondary">-</button> );
    } else {
      return ( <button onClick={this.handleClick} type="button" className="btn btn-outline-secondary">+</button>);
    }
  };

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0].toUpperCase()}</button>);
    } else {
      return (<img className="logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
    }
  };

  render() {
    const {subsAppInfo} = this.props;
    return (
      <>
        <div className="container" id="inner-element">
          <div className="row">
            <div className="col">
              {this.showSubscibeImg(subsAppInfo)}
            </div>
            <div className="col serviceName">
              {subsAppInfo.name}
            </div>
            <div className="col">
              {this.showSubscribeActionBtn()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SubsApp;
