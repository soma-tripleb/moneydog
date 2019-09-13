import axios from 'axios';

export async function login(userInfo) {
  return await axios.post(`${process.env.REACT_APP_NODE_API_URL}/users/signIn`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      userInfo: {
        email: userInfo.email,
        password: userInfo.password,
      },
    }
  ).catch((err) => {
    return err.response;
  });
}

export function responseGoogle(response) {
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
