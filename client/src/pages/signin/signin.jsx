import React, {Component} from 'react';
import cookie from 'react-cookies'
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

import './signin.css';
import * as service from "../signin/signin.ajax";

class Signin extends Component {

  state = {
    email: '',
    password: '',
  };

  signInBtnClicked = async (e) => {

    e.preventDefault();

    const response = await service.login(this.state);
    await this.props.loginRequest(this.state.email,this.state.password);

    console.log(this.props.status);

    if (response.status === 200) {

      // localStorage.setItem('isLogin',"true");
      cookie.save('token', response.data.token, {
        path: '/'
      });

      this.props.history.push('/user/subscribing');
    } else if (response.status === 409) {
      alert(response.data.message);
    } else if (response.status === 400) {
      alert(response.data.message);
    }
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
                <h4 className="card-title mt-3 text-center">Sign In</h4>
                <p>
                  <button onClick={service.responseGoogle} className="btn btn-block btn-google"
                          style={{backgroundColor: 'lightgray'}}>
                    <i className="fab fa-google"/> Login via google
                  </button>
                </p>
                <p className="divider-text">
                  <span className="bg-light">OR</span>
                </p>
                {this.props.status}
                <form>
                  {/*Email input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                    </div>
                    <input name="emailInfo" className="form-control" placeholder="Email address" type="email"
                           value={this.state.email} onChange={this.onChangeEmail}/>
                  </div>
                  {/*createPW input*/}
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                    </div>
                    <input className="form-control" placeholder="Create password" type="password"
                           value={this.state.password} onChange={this.onChangePassword}/>
                  </div>
                  {/*회원가입 버튼*/}
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block" onClick={this.signInBtnClicked}> Sign In
                    </button>
                  </div>
                  <p className="text-center">Don't Have an account? <a href="/signup">Create New Account</a></p>
                </form>
              </article>
            </div>
          </div>
        </>
    );
  }
}

const mapStateToProps = state => ({
  status: state.auth.login.status
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: async (email,password) => {
      await dispatch(actions.loginRequest(email,password))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
