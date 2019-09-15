import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRouter from './privateRouter';
import {Home, Report, Dashboard, Info, SignUp, SignIn, Subscribing, SubscribingInfo, Recommend} from '../pages';
import * as actions from '../actions/auth';
import {connect} from 'react-redux';

class Router extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = localStorage.getItem('auth'); // 로그인 정보를 로컬스토리지에서 가져옵니다.

    if (!loggedInfo || loggedInfo === 'undefined') return; // 로그인 정보가 없다면 여기서 멈춥니다.

    const jsonJWT = JSON.parse(loggedInfo).status.JWT;

    const responseToken = await this.props.sessionRequest(jsonJWT);

    if (responseToken.data === 200) {
      localStorage.setItem('auth', JSON.stringify(this.props.auth));
    } else if (responseToken.data === 401) {
      alert('session 만료 다시 로그인 해주세요');
      this.props.history.push('/signIn');
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

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

// export default Router;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    sessionRequest: async (jwt) => {
      return await dispatch(actions.sessionRequest(jwt));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
