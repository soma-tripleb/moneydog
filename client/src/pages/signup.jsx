import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

class SignUp extends Component {

  responseGoogle = (response) => {
    console.log('axios start');
    console.log(response);

    /* header 에 값이 찍히는 문제 */
    axios.post('https://localhost:8090/tokensignin', {
      data: {
        accessToken: response.accessToken,
        tokenId: response.tokenId,
        gmail: response.profileObj.email,
      },
    }).then((res) => {
      console.log('axios success');
      // window.location.href = ; 
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <h1>Sign-Up</h1>
        <div>
          <div>
            <GoogleLogin
              clientId="532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com"
              scope="https://www.googleapis.com/auth/gmail.readonly"
              onSuccess={this.responseGoogle}
              buttonText="Login with Google"
            />
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;