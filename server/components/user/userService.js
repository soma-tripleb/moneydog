const UserRepository = require('./userRepository');

const UserService = {};

UserService.register = async (req, res) => {
  const userInfo = req.body.userInfo;
  const result = await UserRepository.getUserByEmail(userInfo.email);

  if (Object.keys(result).length === 0) {
    UserRepository.createUser(userInfo);
    return res.status(200).json({status: 200, message: 'Successfully User Register'});
  } else {
    return res.status(400).json({status: 400, message: 'error'});
  }
};

UserService.login = async (req, res) => {
  const userInfo = req.body.userInfo;
  const result = await UserRepository.getUserByEmail(userInfo.email);

  if (Object.keys(result).length === 0) {
    return res.status(400).json({status: 400, message: '아이디가 없다.'});
  } else if (result[0].password === userInfo.password) {
    return res.status(200).json({status: 200, message: 'error'});
  }
};

// const getUserById = (params) => {
//   return UserRepository.getUserById(params);
// };
//
// const getUserList = () => {
//   return UserRepository.getUserList();
// };

// const getUserByEmail = (email) => {
//   // return UserRepository.getUserByEmail(email);
//   UserRepository.getUserByEmail(email);
// };

module.exports = UserService;
