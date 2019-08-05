import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Head extends Component {

  render() {
    return (
        <>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">

            <a className="navbar-brand" href="#">Money Dog</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02"
                    aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample02">
              <ul className="navbar-nav mr-auto">

                <li className="nav-item active">
                  <Link to="/" className="nav-link"><span
                      className="sr-only">(current)</span>Home</Link>
                </li>

                <li className="nav-item">
                  <Link to="/report" className="nav-link">Report</Link>
                </li>

                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>

              </ul>

              <ul className="navbar-nav navbar-right">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">User Info</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown01">
                    <a className="dropdown-item" href="#">Sign In</a>
                    <a className="dropdown-item" href="#">Sign Up</a>
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
