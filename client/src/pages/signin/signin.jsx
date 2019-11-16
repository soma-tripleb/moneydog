import React, { Component } from 'react';
import { connect as ReduxConn } from 'react-redux';
import { Link } from 'react-router-dom';

import authActions from '../../redux/actions/authAction';
import userActions from '../../redux/actions/userAction';

import './signin.css';

import Cookies from 'js-cookie';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  signInBtnClicked = async (e) => {
    e.preventDefault();

    const result = await this.props.loginRequest(this.state.email, this.state.password);

    if (result.status === 200) {
      Cookies.set('token', result.data.token);

      await this.props.getSubsInfo();
      this.props.history.push('/user/dashboard');
    } else if (result.status === 409) {
      alert(result.data.message);
    } else if (result.status === 400) {
      alert(result.data.message);
    }
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" />
        <div className="row">
          <div className="container loginContainer">

            <div className="col-sm-8 report-inner-container">
              <article className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center">로그인</h4>
                {/* <p className="divider-text">*/}
                {/*  <span className="bg-light">REACT GOOGLE LOGIN</span>*/}
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
                    <input name="emailInfo" className="form-control" placeholder="이메일" type="email"
                      value={this.state.email} onChange={this.onChangeEmail} />
                  </div>
                  {/* createPW input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                    </div>
                    <input className="form-control" placeholder="비밀번호" type="password"
                      value={this.state.password} onChange={this.onChangePassword} />
                  </div>
                  {/* 회원가입 버튼*/}
                  <div className="form-group">
                    <button type="submit" className="btn btn-dark btn-block" onClick={this.signInBtnClicked}>
                    로그인
                    </button>
                  </div>
                  <p className="text-center">계정이 없으신가요 ? <Link to="/signup" className="nav-link"> 계정 생성 하기 </Link></p>
                </form>

              </article>
            </div>
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
    loginRequest: async (email, password) => {
      return await dispatch(authActions.loginRequest(email, password));
    },
    getSubsInfo: async () => {
      await dispatch(userActions.getSubsInfo());
    },
  };
};

export default ReduxConn(mapStateToProps, mapDispatchToProps)(Signin);
