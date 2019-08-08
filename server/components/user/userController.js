const express = require('express');

const UserService = require('./userService');

const router = express.Router();

router.get('/create', (req, res) => {
  console.log('create controller called');
  UserService.createUser()
    .then((user) => {
      console.log('user생성');
      res.send(user);
    })
    .catch((e) => {
      console.log('에러발생');
      res.send(e);
    })
});

router.get('/', (req, res) => {
  console.log('get list호출');
  UserService.getUserList()
    .then((users) => {
    console.log('controller users : ', users);
    res.send(users);
  })
    .catch((e) => {
      res.send(e);
    });
});

router.get('/:id', (req, res) => {
  res.send(UserService.getUserById(req.params.id));
});



module.exports = router;
