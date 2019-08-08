const express = require('express');

const UserService = require('./userService');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET /user on controller');
  UserService.getUserList().then((users) => {
    res.send(users);
  });
});

router.get('/:id', (req, res) => {
  res.send(UserService.getUserById(req.params.id));
});

module.exports = router;
