import React, { Component } from 'react';

import { GoogleLogin } from 'react-google-login';
import InfoService from './info.ajax';
import dotenv from 'dotenv';
dotenv.config();

import './info.css';
import AuthActions from '../../redux/actions/authAction';
import {connect as ReduxConn} from 'react-redux';

class Info extends Component {
  state = {
  };

  responseGoogle = async (res) => {
    console.log('google login');

    const result = await InfoService.sendGoogleOAuthCode(res);

    console.log(result);
    // 페이지 이동
  }

  onClicklogout = () => {
    this.props.REDUX_AUTH_LOGOUT_REQUEST();
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="col info">
            <div className="row ">
              <div className="col-6">
                구글 계정 연동 하기
              </div>
              <div className="col-6">
                <GoogleLogin
                  clientId={`${process.env.GOOGLE_API_CLIENT_ID}`}
                  buttonText="Login"
                  scope={`${process.env.GOOGLE_API_SCOPE}`}
                  accessType="offline"
                  responseType="code"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />,
              </div>
            </div>
          </div>

          <div className="col info">
            <div className="row ">
              <div className="col-6">
                로그 아웃 하기
              </div>
              <div className="col-6">
                <button className="" onClick={this.onClicklogout}>
                  로그아웃
                </button>
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
