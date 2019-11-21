import React, { Component } from 'react';

import { GoogleLogin } from 'react-google-login';
import InfoService from './info.ajax';
import dotenv from 'dotenv';
dotenv.config();

import './info.css';
import AuthActions from '../../redux/actions/authAction';
import {connect as ReduxConn} from 'react-redux';

class Info extends Component {
  constructor(props) {
    super(props);
  }

  responseGoogle = async (res) => {
    this.props.history.push('/spinner');

    if (typeof res.code == 'undefined') throw new Error('GOOGLE_OAUTH_CODE_NOT_FOUND');
    else {
      await InfoService.sendGoogleOAuthCode(res.code);
    }
  };

  sendmail = async () =>{
    await InfoService.sendmailFormReport(this.props.userSubscriptions);

    alert('메일을 성공적으로 보냈습니다.');
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
                  <GoogleLogin
                    clientId={`${process.env.GOOGLE_API_CLIENT_ID}`}
                    scope={`${process.env.GOOGLE_API_SCOPE}`}
                    buttonText="OAuth with Google"
                    accessType="offline"
                    responseType="code"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                      <button className="btn btn-block btn-google btn-end" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="fab fa-google" /> 구글 로그인
                      </button>
                    )}
                  />
                </div>
              </div>

              <div className="row info-inner">
                <div className="col text-left  info-text">
                  리포트 메일 보내기
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button onClick={this.sendmail} type="button" className="btn btn-end"> 보내기 </button>

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
  status: state.auth.login.status,
  nickname: state.auth.login.nickname,
  userSubscriptions: state.users.subscriptions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    REDUX_AUTH_LOGOUT_REQUEST: () => {
      dispatch(AuthActions.logoutRequest());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Info);
