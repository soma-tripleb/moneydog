import axios from 'axios';

const listMessages = async (userId, accessToken) => {
  return await axios(
    {
      method: 'get',
      url: `https://www.googleapis.com/gmail/v1/users/${userId}/messages?access_token=${accessToken}`,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    }
  );
};

export default {
  listMessages,
};
