import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

class SignUp extends Component {

  responseGoogle = (response) => {
    console.log('axios start');

    axios.post('https://localhost:8090/tokensignin', {
      data: {
        accessToken: response.accessToken,
        tokenId: response.tokenId,
        gmail: response.profileObj.email,
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      console.log('axios success');
      window.location.href = "http://localhost:8080" + res.data; //to subscriptions
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <h1>Sign-Up</h1>
<<<<<<< HEAD
          <div>
            <div>
              <GoogleLogin 
              clientId="532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com"
              scope="https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly"
              onSuccess={this.responseGoogle}
              buttonText="Login with Google"
              />
            </div>
          </div>
=======
>>>>>>> #52 App(Content) 부분 height 100% 적용
      </>
    );
  }
}

export default SignUp;