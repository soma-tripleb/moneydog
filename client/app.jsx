import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Index from './index';
import Report from './report/report';
import Info from './src/pages/info';

ReactDom.render(
    <Router>
      <Route exact path="/" component={Index}/>
      <Route path="/report" component={Report}/>
      <Route path="/info" component={Info}/>
      {/*<Route path="/report" component={Report}/>*/}
    </Router>
    ,
    document.querySelector('#root')
);
