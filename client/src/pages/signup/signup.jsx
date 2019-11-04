import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect as ReduxConn } from 'react-redux';

import authActions from '../../redux/actions/authAction';
import './signup.css';
import Cookies from 'js-cookie';

class SignUp extends Component {
  state = {
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    errorMessage: '',
  };

  // 회원 가입 버튼 클릭시
  signUpBtnClicked = async (e) => {
    e.preventDefault();

    // 공백 확인
    if (!this.checkBlank()) {
      this.setState({
        errorMessage: '빈칸을 채워주세요',
      });
      return false;
    }

    // 이메일 형식 확인
    if (!this.checkEmailForm()) {
      this.setState({
        errorMessage: '이메일 형식이 올바르지 않습니다.',
      });
      return false;
    }

    // 패스워드 같은지 확인
    if (!this.checkEqualPassword()) {
      this.setState({
        errorMessage: '비밀번호가 일치하지 않습니다.',
      });
      return false;
    }

    // 비밀번호 형식 확인.
    if (!this.checkedPasswordForm()) {
      return false;
    }
    // 모두 통과시 createUser
    // const response = await service.createUser(this.state);
    const result = await this.props.registerRequest(this.state.email, this.state.password, this.state.nickname);

    if (result.status === 400) {
      this.setState({
        errorMessage: '이미 존재하는 아이디 입니다.',
      });
    } else if (result.status === 201) {
      Cookies.set('token', result.data.token);
      this.props.history.push('/user/subscribing');
    }
  };

  checkEmailForm = () => {
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return exptext.test(this.state.email);
  };

  checkBlank = () => {
    return !(this.state.nickname === '' || this.state.email === '' || this.state.passwordCheck === '' || this.state.password === '');
  };

  checkEqualPassword = () => {
    return this.state.passwordCheck === this.state.password;
  };

  checkedPasswordForm = () => {
    const pw = this.state.password;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/ig);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      this.setState({
        errorMessage: '8자리 ~ 20자리 이내로 입력해주세요.',
      });
      return false;
    }

    if (pw.search(/₩s/) !== -1) {
      this.setState({
        errorMessage: '비밀번호는 공백업이 입력해주세요.',
      });
      return false;
    } if (num < 0 || eng < 0 || spe < 0) {
      this.setState({
        errorMessage: '영문,숫자, 특수문자를 혼합하여 입력해주세요.',
      });
      return false;
    }

    return true;
  };

  // textbox 채워 넣을때 이벤트
  onChangeNickName = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };
  // textbox 채워 넣을때 이벤트
  onChangePasswordCheck = (e) => {
    this.setState({
      passwordCheck: e.target.value,
    });
  };
  // textbox 채워 넣을때 이벤트
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  // textbox 채워 넣을때 이벤트
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  customGoogleLogin = () => {
    console.log('CUSTOM GOOGLE LOGIN');

    GoogleApi.authLogin()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" />
        <div className="container registerContainer">

          <div className="card bg-light">
            <article className="card-body mx-auto">
              <h4 className="card-title mt-3 text-center">Sign Up</h4>
              <p className="text-center">Get started with your free account</p>
              {/* <p>*/}
              {/*  <button className="btn btn-block btn-google">*/}
              {/*    <i className="fab fa-google" /> Login via google*/}
              {/*  </button>*/}
              {/* </p>*/}

              {/* <p className="divider-text">*/}
              {/*  <span className="bg-light">OR</span>*/}
              {/* </p>*/}

              <form>
                {/* Email input*/}
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                  </div>
                  <input name="emailInfo" className="form-control" placeholder="Email address" type="email"
                    value={this.state.email} onChange={this.onChangeEmail} />
                </div>
                {/* fullname input*/}
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user" /> </span>
                  </div>
                  <input name="" className="form-control" placeholder="Nick name" type="text"
                    value={this.state.nickname} onChange={this.onChangeNickName} />
                </div>
                {/* createPW input*/}
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                  </div>
                  <input className="form-control" placeholder="Create password" type="password"
                    value={this.state.password} onChange={this.onChangePassword} />
                </div>
                {/* checkPW input*/}
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                  </div>
                  <input className="form-control" placeholder="Repeat password" type="password"
                    value={this.state.passwordCheck} onChange={this.onChangePasswordCheck} />
                </div>
                <div>
                  <label className="passwordErrorLabel">{this.state.errorMessage}</label>
                </div>
                {/* 회원가입 버튼*/}
                <div className="form-group">
                  <button className="btn btn-primary btn-block"
                    onClick={this.signUpBtnClicked}> Create Account
                  </button>
                </div>
                <p className="text-center">Have an account? <Link to="/signin" className="nav-link"> Log In </Link></p>
              </form>
            </article>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: async (email, password, nickname) => {
      return await dispatch(authActions.registerRequest(email, password, nickname));
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(SignUp);
