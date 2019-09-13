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

const createOne = async (userInfo) => {
  const createResult = await User.create((userInfo))
    .then((result) => { return result; })
    .catch((err) => { throw err; });

  return User.find({ nickname: userInfo.nickname })
    .then((result) => {
      return { status: 201, success: true, message: createResult };
    })
    .catch((err) => {
      return { status: 400, success: false, message: err.message };
    });
};

export default {
  findAllUsers,
  findByUserEmail,
  getUserById,
  createOne,
  findSubscriptionByUserEmail,
};
