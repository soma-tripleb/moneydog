import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Row, Layout} from 'antd';

import App from '../shared/app';

import {Head, Foot} from '../component/all/index';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'antd/dist/antd.less';

import '../static/style/total.css';

const Root = () => (
    <BrowserRouter>
      <Row>
        <Layout className="layout">

          <div className="head">
            <Head/>
          </div>

          <div className="app">
            <App/>
          </div>

          <Foot/>

        </Layout>
      </Row>
    </BrowserRouter>
);

export default Root;
