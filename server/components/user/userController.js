const express = require('express');

const UserService = require('./userService');

const router = express.Router();


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

router.get('/:email', (req, res) => {
  const result = UserService.getUserByEmail(req.params.email);
  result
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.end(err));
});

// post 로 들어온 json 형식 userInfo 로 유저 등록,
// TODO: 아이디 중복 확인 필요
router.post('/create', (req, res)=>{
  const userInfo = req.body.userInfo;

  console.log('create controller called');
  UserService.createUser(userInfo)
    .then((user) => {
      console.log('user생성');
      res.send(user);
    })
    .catch((e) => {
      console.log('에러발생');
      res.send(e);
    });
});

module.exports = router;
