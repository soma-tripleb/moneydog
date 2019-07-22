import React, {Component} from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

class DropdownBtn extends Component {

  handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

   handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" />
          login
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          register
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          item 3
        </Menu.Item>
      </Menu>
  );

  render() {
    return (
        <>
          <Dropdown.Button overlay={this.menu} icon={<Icon type="user" />}>
            Dropdown
          </Dropdown.Button>
        </>
    );
  }

}

export default DropdownBtn;
