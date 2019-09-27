import UserSchema from '../../schemas/user';

const findByUserInfo = (email) => {
  return UserSchema.User.findOne({ email: email })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const updateSubscription = async (email, subList) => {
  return UserSchema.User.updateOne({email: email},
    {$set: {subscription: subList}})
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  findByUserInfo, updateSubscription,
};
