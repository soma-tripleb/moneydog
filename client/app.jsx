import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Index from './index';
import Report from './report/report';

ReactDom.render(
    <Router>
      <Route exact path="/" component={Index}/>
      <Route path="/report" component={Report}/>
      {/*<Route path="/report" component={Report}/>*/}
      {/*<Route path="/report" component={Report}/>*/}
    </Router>
    ,
    document.querySelector('#root')
);
