import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Head extends Component {

   state ={
    islogin: localStorage.getItem('isLogin'),
  };

  isLogined = () =>{
    if( this.state.islogin === 'true'){
      return(
          <>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Logout</Link>
            </li>
          </>
      )
    }else{
      return(
          <>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign-up</Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link">Sign-in</Link>
            </li>
          </>
      )
    }
  };

  render() {
    return (
      <>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/" className="navbar-brand nav-link" style={{fontFamily :'GOTHAN-ULTRA'}}>MONEYDOG</Link>
          </li>
        </ul>

        <ul className="nav justify-content-center" style={{fontFamily :'GOTHAN-XLIGHT'}}>
          <li className="nav-item">
            <Link to="/user/subscribing" className="nav-link">Subscribing</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/report" className="nav-link">Report</Link>
          </li>
          <li className="nav-item">
            <Link to="/recommend" className="nav-link">Recommend</Link>
          </li>
          {this.isLogined()}
        </ul>
      </>
    );
  }

}

export default Head;
