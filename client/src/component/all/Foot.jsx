import React, {Component} from 'react';
import {Button, Icon, Layout} from "antd";

const {Footer} = Layout;

import '../../static/style/footer.css';

class Foot extends Component {

  render() {
    return (
        <>
          <Footer id="footer" >
            <Button type="link" size="large" ghost>
              <Icon type="home" theme="twoTone" />
            </Button>
            <Button type="link" size="large" ghost>
              <Icon type="bars" twoToneColor="#eb2f96"/>
            </Button>
            <Button type="link" size="large" ghost>
              <Icon type="smile" theme="twoTone" />
            </Button>
            <Button type="link" size="large" ghost>
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
            </Button>
            <Button type="link" size="large" ghost>
              <Icon type="bar-chart"  twoToneColor="#eb2f96"/>
            </Button>
          </Footer>
        </>
    );
  }
}

export default Foot;
