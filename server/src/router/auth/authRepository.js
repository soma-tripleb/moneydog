import UserSchema from '../../schemas/user';

const getUserByEmail = async (email) => {
  return await UserSchema.User.findOne({email: email})
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return {status: 400, success: false, message: err.message};
    });
};
const createUser = async (userInfo) => {
  return await UserSchema.User.create(userInfo)
    .then((doc) => {
      return {status: 201, success: true, message: '회원가입에 성공했습니다.'};
    })
    .catch((err) => {
      return {status: 400, success: false, message: err.message};
    });
};

const findAllUser = async () => {
  return await UserSchema.User.find({})
    .then((users) => {
      return users;
    })
    .catch((err) => {
      return {status: 400, success: false, message: err.message};
    });
};

export default {
  createUser,
  getUserByEmail,
  findAllUser,
};
