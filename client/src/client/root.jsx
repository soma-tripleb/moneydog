import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import App from '../shared/app';

import 'antd/dist/antd.less';
import '../static/style/total.css';

const Root = () => (
    <BrowserRouter>
        <Row>
            <Col span={6}></Col>

            <Col span={12}>
                <App />
            </Col>
            
            <Col span={6}></Col>
        </Row>
    </BrowserRouter>
);

export default Root;