const UserRepository = require('./userRepository');

const getUserById = (params) => {
  return UserRepository.getUserById(params);
};

const getUserList = () => {
  return UserRepository.getUserList();
};

const createUser = (userInfo) => {
  return UserRepository.createUser(userInfo);
};

async function getUserByEmail(email) {
  const user = await UserRepository.getUserByEmail(email);
  return user;
}

module.exports = {
  getUserById: getUserById,
  getUserList: getUserList,
  createUser: createUser,
  getUserByEmail: getUserByEmail,
};
