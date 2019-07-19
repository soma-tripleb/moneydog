import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Index from './index';
import Report from './report/report';
import DashBoard from './dashBoard/dashboard';

ReactDom.render(
    <Router>
      <Route exact path="/" component={Index}/>
      <Route path="/report" component={Report}/>
      <Route path="/report" component={Report}/>
      <Route path="/dashboard" component={DashBoard}/>
    </Router>
    ,
    document.querySelector('#root')
);
