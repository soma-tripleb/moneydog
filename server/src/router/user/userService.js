import UserRepository from './userRepository';

/*
* Method Naming
* - 'Service' 단 에서는 구체적으로 명시.
* : 파라미터를 통해서 확인 할 수 있는 조건은 파라미터에 맡김.
* : 'Service' 메소드를 호출하는 객체 자체에 도메인('User', 'SubsTmpl', ...) 이 명시 되어있음을 최대한 활용.
*/
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

export default {
  getUserList,
  getUser,
  createOne,
  deleteOne,
};
