const UserRepository = require('./userRepository');

const UserService = {};

// const getUserById = (params) => {
//   return UserRepository.getUserById(params);
// };
//
// const getUserList = () => {
//   return UserRepository.getUserList();
// };

UserService.createUser = async (req, res) => {
  const userInfo = req.body.userInfo;
  const result = await UserRepository.getUserByEmail(userInfo.email);

  if (Object.keys(result).length === 0 ) {
    UserRepository.createUser(userInfo);
    return res.status(200).json({status: 200, message: 'Successfully User Register'});
  } else {
    return res.status(400).json({status: 400, message: 'error'});
  }

  // try {
  //   const users = await UserRepository.getUserByEmail();
  //   return res.status(200).json({status: 200, message: 'Successfully User Register'});
  // } catch (e) {
  //   return res.status(400).json({status: 400, message: e.message});
  // }
};

// const getUserByEmail = (email) => {
//   // return UserRepository.getUserByEmail(email);
//   UserRepository.getUserByEmail(email);
// };

module.exports = UserService;
