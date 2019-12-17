import React, {Component} from 'react';
require('dotenv').config();

class userSubsApp extends Component {

  showSubscibeImg = (subsAppInfo) =>{
    return (<button className="logo-Btn" style={{'background': subsAppInfo.color}}>{subsAppInfo.name[0].toUpperCase()}</button>);
  };

  render() {
    const {subsAppInfo} = this.props;
    return (
      <>
        <div className="col-1">
          {this.showSubscibeImg(subsAppInfo)}
        </div>
      </>
    );
  }
}

export default userSubsApp;
