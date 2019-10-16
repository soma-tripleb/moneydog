import UserSchema from '../../schemas/user';

const findAll = () => {
  return UserSchema.User.find()
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const findOne = (email) => {
  return UserSchema.User.findOne({ email: email })
    .then((result) => {
      console.log(result);
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const saveOne = async (user) => {
  const createResult = await UserSchema.User.create((user))
    .then((result) => { return result; })
    .catch((err) => { throw err; });

  return await UserSchema.User.findOne({ email: createResult.email })
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const deleteOne = (email) => {
  return UserSchema.User.deleteOne({ email: email })
    .then((result) => {
      return { status: 201, success: true, message: { object: email, result } };
    })
    .catch((err) => {
      throw err;
    });
};

const deleteAllUser = () => {
  return UserSchema.User.deleteMany({});
};

const update = (email, subsInfoList) => {
  return UserSchema.User.update(
    { email: email },
    { $push: { subscription: subsInfoList } },
    { runValidators: true }
  ).then((result) => {
    return { status: 201, success: true, message: result };
  }).catch((err) => {
    throw err;
  });
};

export default {
  findAll,
  findOne,
  saveOne,
  deleteOne,
  deleteAllUser,
  update: update,
};
