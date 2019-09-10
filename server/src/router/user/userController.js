import express from 'express';
import UserService from './userService';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('get list호출');
  UserService.getUserList()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(400).send(e);
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


export default router;
