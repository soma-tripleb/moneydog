import express from 'express';
import UserService from './userService';

const router = express.Router();

router.get('/', (req, res) => {
  UserService.getUserList()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.get('/:email', (req, res) => {
  UserService.getUser(req.params.email)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// body: Json Data
router.post('/', (req, res) => {
  UserService.createOne(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/email/:email', (req, res) => {
  UserService.deleteOne(req.params.email)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

export default router;
