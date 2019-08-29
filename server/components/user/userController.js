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
    res.status(201).json({status: 201, message: 'Successfully User Register'});
  } else {
    res.status(409).json({status: 409, message: 'error'});
  }
});
router.post('/signIn', async (req, res) => {
  const loginResponse = await UserService.login(req.body.userInfo);
  if (loginResponse === 200) {
    res.status(200).json({status: 200, message: '로그인 성공'});
  } else if (loginResponse === 400) {
    res.status(400).json({status: 400, message: '아이디가 없다.'});
  } else {
    res.status(409).json({status: 409, message: '비밀번호가 틀렸습니다.'});
  }
});

module.exports = router;
