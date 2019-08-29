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

async function getUserByEmail(email) {
  const user = User.findOne({email});
  console.log(user);
  return user;
}

const createUser = (userInfo) => {
  return User.create(userInfo);
};

module.exports = {
  getUserList: getUserList,
  getUserById: getUserById,
  createUser: createUser,
  getUserByEmail: getUserByEmail,
};
