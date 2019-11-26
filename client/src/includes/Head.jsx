import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { connect as ReduxConn } from 'react-redux';
import AuthActions from '../redux/actions/authAction';

import './css/header.css';
import MDBlackIcon from 'image/MDBlackIcon.png';

class Head extends Component {
  logout = () => {
    this.props.REDUX_AUTH_LOGOUT_REQUEST();
  };

  isLogined = () => {
    if (this.props.status === 'SUCCESS') {
      return (
        <>
          <li className="nav-item phone-display">
            <NavLink to="/" className="nav-link" >
              <img className="report-logoImg" src={`${MDBlackIcon}`} alt="Generic placeholder image"/>
            </NavLink>
          </li>
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
            <NavLink to="/user/info" className="nav-link"><span className="nav-user">{this.props.nickname}</span> 님</NavLink>
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
            <NavLink to="/signup" className="nav-link">회원가입</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signin" className="nav-link">로그인</NavLink>
          </li>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <header>
          <div className="container headerContainer">
            <div className="row">
              {/* <div className="col-md-6">*/}
              {/*  <img className="headeImg" src={`${process.env.REACT_APP_IMAGE_URI}/img/MDheader.png`}/>*/}
              {/* </div>*/}
              <div className="col-md-6">
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/" className="navbar-brand  headerFont">
                      <img className="headeImg" src={`${process.env.REACT_APP_IMAGE_URI}/img/MDheader.png`}/>
                    </Link>
                  </li>
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
  nickname: state.auth.login.nickname,
});

const mapDispatchToProps = (dispatch) => {
  return {
    REDUX_AUTH_LOGOUT_REQUEST: () => {
      dispatch(AuthActions.logoutRequest());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Head);
