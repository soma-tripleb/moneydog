import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';

import * as service from './signup.ajax';
import './signup.css';

class SignUp extends Component {

  state = {
    nickName: '',
    email: '',
    password: '',
    passwordCheck: '',
    passwordError: '',
  };

  //회원 가입 버튼 클릭시
  signupBtnClicked = (e) => {
    console.log(e);
    if(this.state.nickName === '' || this.state.email === '' || this.state.passwordCheck === '' || this.state.password === '' ){
      this.setState({
        passwordError : '빈칸을 채워주세요',
      });
      return
    }

    //비민번호 같은지 확인
    if (this.state.passwordCheck !== this.state.password) {
      this.setState({
        passwordError : '비밀번호가 일치하지 않습니다.',
      });
      return
    }else{
      this.setState({
        passwordError : '',
      });
      //모두 통과시 createUser
      service.createUser(this.state);
    }
  };

  onChangeNickName = (e) => {
    this.setState({
      nickName: e.target.value
    });
  };
  onChangePasswordCheck = (e) => {
    this.setState({
      passwordCheck: e.target.value
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
        <>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"/>
          <div className="container">

            <div className="card bg-light">
              <article className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                <p className="text-center">Get started with your free account</p>
                <p>
                  <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"/> Login via
                    Twitter</a>
                  <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"/> Login via
                    facebook</a>
                  <button onClick={service.responseGoogle} className="btn btn-block btn-google"><i
                      className="fab fa-google"/> Login via
                    google
                  </button>
                  {/*<hr/>*/}
                  {/*<GoogleLogin*/}
                  {/*    clientId="532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com"*/}
                  {/*    scope="https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly"*/}
                  {/*    onSuccess={service.responseGoogle}*/}
                  {/*    buttonText="Login with Google"*/}
                  {/*/>*/}
                </p>
                <p className="divider-text">
                  <span className="bg-light">OR</span>
                </p>
                <form>
                  {/*Email input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                    </div>
                    <input name="emailInfo" className="form-control" placeholder="Email address" type="email"
                           value={this.state.email} onChange={this.onChangeEmail}/>
                  </div>
                  {/*fullname input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-user"/> </span>
                    </div>
                    <input name="" className="form-control" placeholder="Nick name" type="text"
                           value={this.state.nickName} onChange={this.onChangeNickName}/>
                  </div>
                  {/*createPW input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                    </div>
                    <input className="form-control" placeholder="Create password" type="password"
                           value={this.state.password} onChange={this.onChangePassword}/>
                  </div>
                  {/*checkPW input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                    </div>
                    <input className="form-control" placeholder="Repeat password" type="password"
                           value={this.state.passwordCheck} onChange={this.onChangePasswordCheck}/>
                  </div>
                  <div>
                    <label className="passwordErrorLabel">{this.state.passwordError}</label>
                  </div>
                  {/*회원가입 버튼*/}
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.signupBtnClicked}> Create
                      Account
                    </button>
                  </div>
                  <p className="text-center">Have an account? <a href="/signin">Log In</a></p>
                </form>
              </article>
            </div>
          </div>
        </>
    );
  }

}

export default SignUp;
