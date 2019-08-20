import React, {Component} from 'react';
import  { Redirect } from 'react-router-dom'

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

    if(response.status === 200 ){
      this.props.history.push('/user/subscriptions');
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

export default Signin;
