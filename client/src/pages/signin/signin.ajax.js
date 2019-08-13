import axios from "axios";


export async function login(userInfo) {
  return await axios.post(`http://localhost:5000/users/login`, {
    userInfo: {
      email: userInfo.email,
      password: userInfo.password,
    }
  });
}
