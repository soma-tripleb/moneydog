const User = require('../../models/user');

const getUserList = () => {
  console.log(User.find({}))
  return User.find({}, (err, users) => {
    if (err) throw err;
    console.log('users : ',users);
  });
};

const getUserById = (params) => {
  const modelParams = Object.assign({}, params);
  return User.find(modelParams);
}

const createUser = () => {
  let user = {username : 'jimmy', password: '1234', content: 'helloworld'};
  return User.create(user);
}

module.exports = {
  getUserList: getUserList,
  getUserById: getUserById,
  createUser: createUser,
}
