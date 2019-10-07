import React, {Component} from 'react';

import {Provider} from 'react-redux';

import '@babel/polyfill';
import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {Head, Foot} from '../includes';

import {BrowserRouter} from 'react-router-dom';
import Router from './router';

import configureStore from '../store';
import {PersistGate} from 'redux-persist/integration/react';

const { store, persistor } = configureStore();

import './root.css';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>

            <div className="layout">
              <Head/>
              <Router/>
              <Foot/>
            </div>

          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;
