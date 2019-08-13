const User = require('../../models/user');

const getUserList = () => {
  console.log(User.find({}));
  return User.find({}, (err, users) => {
    if (err) throw err;
    console.log('users : ', users);
  });
};

const getUserById = (params) => {
  const modelParams = Object.assign({}, params);
  return User.find(modelParams);
};

const getUserByEmail = (email) => {
  User.find({email: email})
    .then((user) => user[0])
    .catch((err) => console.log(err));
};

const createUser = (userInfo) => {
  return User.create(userInfo);
};

module.exports = {
  getUserList: getUserList,
  getUserById: getUserById,
  createUser: createUser,
  getUserByEmail: getUserByEmail,
};
