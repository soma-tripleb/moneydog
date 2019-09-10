import React from 'react';

import {Provider} from 'react-redux';
import store from '../store';

import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {Head, Foot} from '../include';
import {Row, Layout} from 'antd';

import {BrowserRouter} from 'react-router-dom';
import Router from './router';

import './root.css';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>

      <Row>
        <Layout className="layout">
          <Head/>
          <Router/>
          <Foot/>
        </Layout>
      </Row>

    </BrowserRouter>
  </Provider>
);

export default Root;
