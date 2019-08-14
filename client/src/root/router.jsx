import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Report, Dashboard, Info, SignUp, SignIn } from '../pages';  // page
import { Subscriptions } from '../pages/user';  // user page

class Router extends Component {
  render() {
    return (
        <>
          <div>
            <Route exact path="/" component={Home}/>
            <Switch>
              <Route path="/report" component={Report}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/info" component={Info}/>
              {/* user */}
              <Route path="/signup" component={SignUp}/>
              <Route path="/signin" component={SignIn}/>
              <Route path="/user/subscriptions" component={Subscriptions}/>
            </Switch>
          </div>
        </>
    );
  }
}

export default Router;
