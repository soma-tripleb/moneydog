const express = require('express');
const router = express.Router();

const UserService = require('./userService');
const UserTest = require('./userTest');

router.get('/', (req, res) => {
  console.log('get list호출');
  UserService.getUserList()
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.get('/:id', (req, res) => {
  res.send(UserService.getUserById(req.params.id));
});

// post 로 들어온 json 형식 userInfo 로 유저 등록,
// router.post('/create', (req, res)=>{
//   const userInfo = req.body.userInfo;
//
//   console.log('create controller called');
//   UserService.createUser(userInfo)
//     .then((user) => {
//       console.log('user 생성');
//       res.send(user);
//     })
//     .catch((e) => {
//       console.log('에러 발생');
//       res.send(e);
//     });
// });

router.post('/create', UserService.createUser);

router.post('/login', UserTest.findUserByEmail);

module.exports = router;
