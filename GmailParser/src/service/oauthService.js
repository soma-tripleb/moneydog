import GoogleOAuth from '../util/googleOAuth';
import UserQuery from '../db/usersQuery';

const userRegister = async (code) => {

  const OAuth2Client = new GoogleOAuth();

  try {
    const oauthResponse = await OAuth2Client.getToken(code);

    if (oauthResponse.tokens.refresh_token === undefined)
      throw new Error('`refresh_token` 이 저장 되어 있는 사용자');

    // oauth credential
    OAuth2Client.credentials = oauthResponse.tokens;

    // // get profile
    const profile = await OAuth2Client.getProfile();

    console.log(profile);

    const userInfo = {
      useremail: profile.data.email,
      username: profile.data.name,
      refreshToken: oauthResponse.tokens.refresh_token,
    };

    const result = await UserQuery.insertUser(userInfo);

    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  userRegister,
};
