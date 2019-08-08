const User = require('../../models/user');

const getUserList = () => {
  return User.find({});
};

const getUserById = (params) => {
  const modelParams = Object.assign({}, params);
  return User.find(modelParams);
}

module.exports = {
  getUserList: getUserList,
  getUserById: getUserById,
}
