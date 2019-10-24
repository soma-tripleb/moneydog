import React, { Component } from 'react';
import { NavLink ,Link } from 'react-router-dom';

import { connect as ReduxConn } from 'react-redux';
import AuthActions from '../redux/actions/authAction';

import './css/header.css';

class Head extends Component {
  logout = () => {
    this.props.REDUX_AUTH_LOGOUT_REQUEST();
  };

  isLogined = () => {
    if (this.props.status === 'SUCCESS') {
      return (
        <>
          <li className="nav-item">
            <NavLink to="/user/dashboard" className="nav-link" >대쉬보드</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/report" className="nav-link">리포트</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/subscribing" className="nav-link" >구독관리</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user/info" className="nav-link"><span className="nav-user">user</span> 님</NavLink>
          </li>
          {/* <li className="nav-item logout">*/}
          {/*  <a onClick={this.logout} className="nav-link">Logout</a>*/}
          {/* </li>*/}
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link">Sign-up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signin" className="nav-link">Sign-in</NavLink>
          </li>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/" className="navbar-brand nav-link headerFont"> MONEY DOG </Link>
                  </li>
                </ul>
                <ul className="nav">
                  <span className="subHeaderFont"> 경제적인 구독 전략 - </span>
                  <span className="subHeaderFont headerBold"> &nbsp; 머니독 </span>
                </ul>
              </div>
              <div className="col-md-6 categoryFont">
                <ul className="nav">
                  {this.isLogined()}
                </ul>
              </div>
            </div>
          </div>
        </header>
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
