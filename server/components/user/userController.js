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

router.post('/signUp', (req, res) => {
  if (UserService.register(req.body.userInfo)) {
    res.status(201).json({status: 201, message: '회원가입에 성공했습니다.'});
  } else {
    res.status(409).json({status: 409, message: '이미 있는 아이디 입니다.'});
  }
});

router.post('/signIn', async (req, res) => {
  const loginResponse = await UserService.login(req.body.userInfo);
  if (loginResponse === 200) {
    const token = UserService.createJWT(req.body.userInfo.email);
    res.cookie('user', token);
    console.log(token);
    res.status(200).json({status: 200, message: '로그인에 성공했습니다.', token: token});
  } else if (loginResponse === 400) {
    res.status(400).json({status: 400, message: '없는 아이디 입니다.'});
  } else {
    res.status(409).json({status: 409, message: '비밀번호가 틀렸습니다.'});
  }
});

module.exports = router;
