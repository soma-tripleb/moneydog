import UserSchema from 'src/schemas/user';

const updateRefreshToken = async (useremail, refreshToken) => {
  let result;

  try {
    const updateResult = await UserSchema.User.updateOne({ email: useremail }, { refreshToken: refreshToken });

    result = {
      n: updateResult.n,
      nModified: updateResult.nModified,
      ok: updateResult.ok
    };

  } catch (err) {
    throw new Error('OAUTH_REPOSITORY_UPDATE_REFRESH_TOKEN');
  }

  return result;
};

export default {
  updateRefreshToken
};