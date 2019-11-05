import React, {Component} from 'react';
require('dotenv').config();

class userSubsApp extends Component {

  handleClick = () => {
    const {subsAppInfo, onDelete, onInsert} = this.props;

    // alert('구독중인 서비스를 취소 하시겠습니까?');
  };

  showSubscribeActionBtn = () => {
    return <img onClick={this.handleClick} className="logo-img" src={`${process.env.REACT_APP_IMAGE_URI}/img/check.png`}/>;
  };

  showSubscibeImg = (subsAppInfo) =>{
    if (subsAppInfo.logoURI === '') {
      return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0]}</button>);
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

export default userSubsApp;
