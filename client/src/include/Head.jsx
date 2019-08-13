import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Head extends Component {

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">

          <a className="navbar-brand" href="#">Money Dog</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample02">≤
            <ul className="navbar-nav mr-auto">

              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              <li className="nav-item">
               <Link to="/report" className="nav-link">Report</Link>
              </li>

              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>

            </ul>

            {/* User Info */}
            <ul className="navbar-nav navbar-right">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  User Info
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <Link to="/user/subscriptions" className="dropdown-item">subscriptions</Link>
                  <Link to="/signin" className="dropdown-item">sign-in</Link>
                  <Link to="/signup" className="dropdown-item">sign-up</Link>
                </div>
              </li>
            </ul>

          </div>
        </nav>
      </>
    );
  }

}

export default Head;
