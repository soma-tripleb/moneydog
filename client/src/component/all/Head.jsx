import React, {Component} from 'react';
import {Layout} from "antd";

import DropdownBtn from './DropdownBtn';

const {Header} = Layout;

class Head extends Component {

  render() {
    return (
        <>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Money Dog</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02"
                    aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample02">

              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown01">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
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
