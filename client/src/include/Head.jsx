import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect as ReduxConn } from 'react-redux';
import AuthActions from '../reducers/actions/authAction';

class Head extends Component {
  logout = () => {
    this.props.REDUX_AUTH_LOGOUT_REQUEST();
  };

  isLogined = () => {
    if (this.props.status === 'SUCCESS') {
      return (
        <>
          <li className="nav-item">
            <a onClick={this.logout} className="nav-link">Logout</a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Sign-up</Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav-link">Sign-in</Link>
          </li>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/" className="navbar-brand nav-link" style={{ fontFamily: 'GOTHAN-ULTRA' }}>MONEYDOG</Link>
          </li>
        </ul>

        <ul className="nav justify-content-center" style={{ fontFamily: 'GOTHAN-XLIGHT' }}>
          <li className="nav-item">
            <Link to="/user/subscribing" className="nav-link">Subscribing</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/subscribing-Info" className="nav-link">Subscribing Info</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/report" className="nav-link">Report</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/recommend" className="nav-link">Recommend</Link>
          </li>

          {this.isLogined()}

        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.auth.login.status,
});

const mapDispatchToProps = (dispatch) => {
  return {
    REDUX_AUTH_LOGOUT_REQUEST: () => {
      dispatch(AuthActions.logoutRequest());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Head);
