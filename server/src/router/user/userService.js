import dotenv from 'dotenv';
dotenv.config();

import UserRepository from './userRepository';


const getUserByEmail = async (email) => {
  const user = await UserRepository.getUserByEmail(email);
  return user;
};

export default {
  getUserByEmail,
};
