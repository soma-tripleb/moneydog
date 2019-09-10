import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRouter from './privateRouter';
import {Home, Report, Dashboard, Info, SignUp, SignIn, Subscribing, SubscribingInfo, Recommend} from '../pages';

class Router extends Component {
  render() {
    return (
        <>
          <div>
            <Route exact path="/" component={Home}/>
            <Switch>
              {/* user */}
              <PrivateRouter path="/report" component={Report}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/signin" component={SignIn}/>
              <PrivateRouter path="/dashboard" component={Dashboard}/>
              <PrivateRouter path="/info" component={Info}/>
              <PrivateRouter path="/user/subscribing" component={Subscribing}/>
              <PrivateRouter path="/user/subscribing-info" component={SubscribingInfo} />
              <PrivateRouter path="/recommend" component={Recommend}/>
            </Switch>
          </div>
        </>
    );
  }
}

export default Router;
