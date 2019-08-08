const UserRepository = require('./userRepository');

const getUserById = (params) => {
  return UserRepository.getUserById(params);
}

const getUserList = () => {
  return UserRepository.getUserList();
}

module.exports = {
  getUserById: getUserById,
  getUserList: getUserList,
}
