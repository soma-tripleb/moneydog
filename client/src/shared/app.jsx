import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Report, Dashboard } from '../pages/index';  // page

import Menu from '../component/all/Menu';   // component

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/report" component={Report} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
                <Menu />
            </div>
        );
    }
}

export default App;
