import axios from "axios";


export async function login(userInfo) {
  return await axios.post(`http://localhost:5000/users/login`, {
    userInfo: {
      email: userInfo.email,
      password: userInfo.password,
    }
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
