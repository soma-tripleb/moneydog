import axios from "axios";

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

export function createUser(userInfo) {
  return axios.post(`${process.env.REACT_APP_NODE_API_URL}/users/create`, {
    userInfo: {
      email: userInfo.email,
      username: userInfo.nickName,
      password: userInfo.password,
      content: "content",
    }
  });
}
