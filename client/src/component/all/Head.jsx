import React, {Component} from 'react';
import {Layout} from "antd";

import DropdownBtn from './DropdownBtn';

const {Header} = Layout;

class Head extends Component {

  render() {
    return (
        <>
          <Header>
            <div className="logo"/>

            <h1
                style={{lineHeight: '64px', color: '#fff', display: 'inline'}}
            >
              MONEY DOG
            </h1>
            <div style={{float: 'right'}}>
              <DropdownBtn/>
            </div>
          </Header>
        </>
    );
  }

}

export default Head;
