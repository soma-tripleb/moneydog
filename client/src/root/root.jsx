import React from 'react';
import {Provider} from 'react-redux';
import store from '../store';

import {BrowserRouter} from 'react-router-dom';
import {Row, Layout} from 'antd';

import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//직접 만든 모듈들
import {Head, Foot} from '../include';
import Router from './router';
import './root.css';

const Root = () => (
    <Provider store={store}>
      <BrowserRouter>
        <Row>
          <Layout className="layout">

            <div className="head">
              <Head/>
            </div>

            <div className="app">
              <Router/>
            </div>

            <Foot/>

          </Layout>
        </Row>
      </BrowserRouter>
    </Provider>
);

export default Root;
