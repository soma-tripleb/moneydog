import express from 'express';
import UserService from './userService';

import userRepository from './userRepository';

const router = express.Router();

router.get('/', (req, res) => {
  userRepository.findAllUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get('/email/:email', (req, res) => {
  userRepository.findByUserEmail(req.params.email)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/subscription/:email', (req, res) => {
  userRepository.findSubscriptionByUserEmail(req.params.email)
    .then((subscription) => {
      res.send(subscription);
    })
    .catch((err) => {
      res.send(err);
    });
});


export default router;
