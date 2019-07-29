import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';


import App from '../shared/app';

import { Head, Foot } from '../component/all/index';

import 'antd/dist/antd.less';
import '../static/style/total.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const Root = () => (
    <BrowserRouter>
        <Row>
              <Layout className="layout">

                <Head/>

                <App />

                <button className="btn btn-primary">Primary</button>

                <Foot/>

              </Layout>
        </Row>
    </BrowserRouter>
);

export default Root;
