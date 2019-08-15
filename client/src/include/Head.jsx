import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Head extends Component {

  render() {
    return (
      <>
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a className="navbar-brand" href="#" style={{fontFamily :'GOTHAN-ULTRA'}}><Link to="/" className="nav-link">MONEYDOG</Link></a>
          </li>          
        </ul>

        <ul class="nav justify-content-center" style={{fontFamily :'GOTHAN-XLIGHT'}}>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/signup">Sign-up</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/signin">Sign-in</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/user/subscribing">Subscribing</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/dashboard">Dashboard</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/report">Report</Link></a>
          </li>
        </ul>
      </>
    );
  }

}

export default Head;
