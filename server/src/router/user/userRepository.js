import User from '../../schemas/user';

/*
* Method Naming
* - 'Repository' 단 에서는 최대한 'mongoose' method 와 비슷하게 작성.
* : 'findOne()'에서 'email' 을 통한 검색 일 경우, 파라미터를 통해서 조건 확인 할 수 있음.
* : 추상적으로 통일 한 후에, 'Service' 단에서 구체화.
*/
const findAll = () => {
  return User.find()
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const findOne = (email) => {
  return User.find({ email: email })
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const saveOne = async (user) => {
  const createResult = await User.create((user))
    .then((result) => { return result; })
    .catch((err) => { throw err; });

  return await User.find({ nickname: createResult.nickname })
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const findSubscriptionByUserEmail = (email) => {
  return User.findOne({email: email})
    .then((user) => user.subscription )
    .catch((err) => err);
};

/**
 *
 * @param {*} email
 * @return {result} true - { n: 1, ok: 1, deletedCount: 1 }
 */
const deleteOne = (email) => {
  return User.deleteOne({ email: email })
    .then((result) => {
      return { status: 201, success: true, message: { object: email, result } };
    })
    .catch((err) => {
      throw err;
    });
};

const deleteAllUser = () => {
  return User.deleteMany({});
};

export default {
  findAll,
  findOne,
  saveOne,
  deleteOne,
  deleteAllUser,
  findSubscriptionByUserEmail,
};
