import User from '../../schemas/user';

const findAllUsers = () => {
  return User.find({}, (err, users) => {
    if (err) throw err;
    else users;
  });
};

const findByUserEmail = (email) => {
  return User.findOne({email: email}, (err, user) => {
    if (err) throw err;
    else user;
  });
};

const findSubscriptionByUserEmail = (email) => {
  return User.findOne({email: email})
    .then((user) => user.subscription )
    .catch((err) => err);
};

const getUserById = (params) => {
  const modelParams = Object.assign({}, params);
  return User.find(modelParams);
};

const createUser = (userInfo) => {
  return User.create(userInfo);
};

export default {
  findAllUsers,
  findByUserEmail,
  getUserById,
  createUser,
  findSubscriptionByUserEmail,
};
