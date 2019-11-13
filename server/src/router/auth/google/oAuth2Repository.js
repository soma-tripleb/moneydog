import UserSchema from 'src/schemas/user';

const updateRefreshToken = async (useremail, refreshToken) => {
  try {
    const result = await UserSchema.User.updateOne({ email: useremail }, { refreshToken: refreshToken });

    return result;
  } catch (err) {
    throw new Error('OAUTH_REPOSITORY_UPDATE_REFRESH_TOKEN');
  }
};

export default {
  updateRefreshToken
};