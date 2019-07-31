import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Report, Dashboard, Info, SignUp } from '../pages/index';  // page

class App extends Component {
  render() {
    return (
        <>
          <div>
            <Route exact path="/" component={Home}/>
            <Switch>
              <Route path="/report" component={Report}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/info" component={Info}/>
              <Route path="/signup" component={SignUp}/>
            </Switch>
          </div>
        </>
    );
  }
}

export default App;
