import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Report, Dashboard } from '../pages/index';  // page

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/report" component={Report} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default App;
