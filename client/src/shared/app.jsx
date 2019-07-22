import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Report, Info } from '../pages/index';  // page

import Menu from '../component/Menu';   // component

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/report" component={Report} />
                    <Route path="/info" component={Info} />
                </Switch>
              <Menu />
            </div>
        );
    }
}

export default App;
