import React, {Component} from 'react';

import {connect, Provider} from 'react-redux';
// import {store, persistor} from '../store';
import store from '../store';
import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {Head, Foot} from '../include';
import {Row, Layout} from 'antd';

import {BrowserRouter} from 'react-router-dom';
import Router from './router';
import {PersistGate} from 'redux-persist/integration/react';

import './root.css';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
          <BrowserRouter>
            <Row>
              <Layout className="layout">
                <Head/>
                <Router/>
                <Foot/>
              </Layout>
            </Row>
          </BrowserRouter>
        {/*</PersistGate>*/}
      </Provider>
    );
  }
}

export default Root;
