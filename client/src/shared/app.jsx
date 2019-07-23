import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Report, Dashboard, Info } from '../pages/index';  // page

import { Menu, Footer } from '../component/index';   // component

class App extends Component {
    render() {
        return (
            <>
                <div>
                    <Route exact path="/" component={Home} />
                    <Switch>
                      <Route path="/report" component={Report} />
                      <Route path="/dashboard" component={Dashboard} />
                      <Route path="/info" component={Info} />

                    </Switch>

                </div>
                {/* <Menu /> */}
                <Footer />
            </>
        );
    }
}

export default App;
