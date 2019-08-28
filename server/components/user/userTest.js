const User = require('../../models/user');

const UserService = {};

UserService.findUserByEmail = (req, res) => {
  const userInfo = req.body.userInfo;
  User.find({email: userInfo.email}).exec((err, user) =>{
    if (err) {
      console.log(`findUserByEmail Error ${err}`);
    } else {
      if (user[0].password === userInfo.password) {
        return res.status(200).json('Success ! '); // login 성공
      } else {
        return res.status(401).json('Failed !'); // login 실패
      }
    }
  });
};


module.exports = UserService;
