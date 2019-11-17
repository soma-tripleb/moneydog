import React, { Component } from 'react';

import './info.css';
import AuthActions from '../../redux/actions/authAction';
import {connect as ReduxConn} from 'react-redux';
import MontlyReport from '../report/MontlyReport';
import ThreeMontlyInfo from '../report/ThreeMontlyInfo';

class Info extends Component {
  state = {
  };

  onClicklogout = () => {
    this.props.REDUX_AUTH_LOGOUT_REQUEST();
  };

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" />
        <div className="container main-container">
          <div className="row">
            <div className="col-sm-8 report-container report-inner-container align-self-center">

              <div className="row info-inner">
                <div className="col text-left  info-text">
                    구글 계정 연동 하기
                </div>
              </div>
              <div className="row">
                <div className="col align-self-center">
                  <button className="btn btn-block btn-google btn-end" onClick={this.onClickGoogleBtn}>
                    <i className="fab fa-google" /> 구글 로그인
                  </button>
                </div>
              </div>

              <div className="row info-inner">
                <div className="col text-left  info-text">
                    로그 아웃 하기
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button onClick={this.onClicklogout} type="button" className="btn btn-end"> 나가기 </button>

                </div>
              </div>

            </div>
          </div>
        </div>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // status: state.auth.login.status,
  // nickname: state.auth.login.nickname,
});

const mapDispatchToProps = (dispatch) => {
  return {
    REDUX_AUTH_LOGOUT_REQUEST: () => {
      dispatch(AuthActions.logoutRequest());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Info);
