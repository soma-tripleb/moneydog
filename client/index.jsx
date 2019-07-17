import React, {Component} from 'react';
import Categorie from './categories/sample';
import Info from './info/info';
import 'antd/dist/antd.less';

class Index extends Component {
  state = {
    text: 'hello,!',
  };

  render() {
    return (
      <>
        <h1>{this.state.text}</h1>
        <Info />
      </>
    );
  }
}
export default Index;
