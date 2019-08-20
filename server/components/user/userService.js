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

const getUserByEmail = (email) => {
  // return UserRepository.getUserByEmail(email);
  UserRepository.getUserByEmail(email);
};

module.exports = {
  getUserById: getUserById,
  getUserList: getUserList,
  createUser: createUser,
  getUserByEmail: getUserByEmail,
};
