const UserRepository = require('./userRepository');

const register = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);
  if (user === null) {
    UserRepository.createUser(userInfo);
    return true;
  } else {
    return false;
  }
};

const login = async (userInfo) => {
  const user = await UserRepository.getUserByEmail(userInfo.email);
  if (user === null) {
    return 400;
  } else if (user.password === userInfo.password) {
    return 200;
  } else if (user.password !== userInfo.password) {
    return 409;
  };
};


const getUserByEmail = (email) => {
  // return UserRepository.getUserByEmail(email);
  UserRepository.getUserByEmail(email);
};

module.exports = {
  register: register,
  login: login,
  getUserByEmail: getUserByEmail,
}
