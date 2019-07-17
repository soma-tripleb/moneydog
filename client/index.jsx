import React, {Component} from 'react';
import Categorie from './categories/sample';
import 'antd/dist/antd.less';

class Index extends Component {
  state = {
    text: 'hello,!',
  };

  render() {
    return (
        <>
          <h1>{this.state.text}</h1>
          <Categorie />
        </>
    );
  }
}

export default Index;
