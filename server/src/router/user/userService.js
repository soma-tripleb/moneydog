import UserRepository from './userRepository';

const getUserList = () => {
  return UserRepository.findAll();
};

const getUser = (email) => {
  return UserRepository.findOne(email);
};

const createOne = (user) => {
  return UserRepository.saveOne(user);
};

const deleteOne = (name) => {
  return UserRepository.deleteOne(name);
};

const insertSubsInfo = (email, subsInfoList) => {
  return UserRepository.updateMany(email, subsInfoList);
};

export {
  getUserList,
  getUser,
  createOne,
  deleteOne,
  insertSubsInfo,
};
