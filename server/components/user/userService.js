const UserRepository = require('./userRepository');

const getUserById = (params) => {
  return UserRepository.getUserById(params);
};

const getUserList = () => {
  return UserRepository.getUserList();
};

const createUser = () => {
  return UserRepository.createUser();
};

module.exports = {
  getUserById: getUserById,
  getUserList: getUserList,
  createUser: createUser,
};
