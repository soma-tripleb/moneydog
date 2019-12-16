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
      // return (<button onClick={this.handleClick} type="button" className="btn btn-outline-secondary">-</button> );
      return ( <button onClick={this.handleClick} type="button" className="btn btn-sm btn-outline-info btn-subscribing">삭제</button>);
    } else if (this.props.subsAppInfo.label === 'addedSubs') {
      // return ( <button onClick={this.handleClick} type="button" className="btn btn-outline-secondary">+</button>);
      return ( <button onClick={this.handleClick} type="button" className="btn btn-sm btn-info btn-subscribing">구독 추가</button>);
    } else {
      // return ( <button onClick={this.handleClick} type="button" className="btn btn-outline-secondary">+</button>);
      return ( <button onClick={this.handleClick} type="button" className="btn btn-sm btn-outline-info btn-subscribing">구독 추가</button>);
    }
  };

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0].toUpperCase()}</button>);
    } else {
      // return (<img className="logo-img" src={`${process.env.REACT_APP_IMAGE_URI}` + subsAppInfo.logoURI} alt="x" />);
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0].toUpperCase()}</button>);
    }
  };

  render() {
    const {subsAppInfo} = this.props;
    return (
      <>
        <div className="container phone-padding-zero">
          <div className="row">
            <div className="col-2 align-self-center">
              {this.showSubscibeImg(subsAppInfo)}
            </div>
            <div className="col phone-padding-zero">
              <div className="row bottom-border">
                <div className="col-4 serviceName text-left padding-zero">
                  {subsAppInfo.name}
                </div>
                <div className="col service-sub-Name text-left padding-zero">
              엔터테인먼트
                </div>
                <div className="col-3 padding-zero">
                  {this.showSubscribeActionBtn()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SubsApp;
