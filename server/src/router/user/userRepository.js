import User from '../../schemas/user';

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

const getUserByEmail = async (email) => {
  return await User.findOne({email: email})
    .then((user) => {
      return user;
    })
    .catch((err) => console.log(err));
};

const createUser = (userInfo) => {
  return User.create(userInfo);
};

const deleteAllUser = () => {
  return User.destroy({ truncate: true});
};

const deleteUserByEmail = (email) => {
  return User.deleteOne({email: email});
}

export default {
  getUserList,
  getUserById,
  createUser,
  getUserByEmail,
  deleteAllUser,
  deleteUserByEmail,
};
