import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Row, Layout } from 'antd';

import {Head, Foot} from '../component/all/index';
import App from '../shared/app';

import 'antd/dist/antd.less';
import '../static/style/total.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

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
          <App />
        </div>

        <Foot />

      </Layout>
    </Row>
  </BrowserRouter>
);

export default Root;
