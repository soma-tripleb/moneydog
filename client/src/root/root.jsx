import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Row, Layout } from 'antd';

import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//직접 만든 모듈들
import {Head, Foot} from '../include';
import Router from './router';
import './root.css';

const Root = () => (
  <BrowserRouter>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MoneyDog</title>
      <meta name="google-signin-client_id" content="532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com"></meta>
    </Helmet>

    <Row>
      <Layout className="layout">

        <div className="head">
          <Head />
        </div>

        <div className="app">
          <Router />
        </div>

        <Foot />

      </Layout>
    </Row>
  </BrowserRouter>
);

export default Root;
