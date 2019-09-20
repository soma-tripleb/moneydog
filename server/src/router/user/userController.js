import express from 'express';
import UserService from './userService';
import jwtDecode from 'jwt-decode';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET /users/ called');
  UserService.getUserList()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(`/users에서 에러`);
      res.send(e);
    });
});

router.get('/:email', (req, res) => {
  console.log(`/users/email 찍힘 ${req.param.email}`)
  UserService.getUser(req.params.email)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`/users/:email에서 에러 발생`);
      res.send(err);
    });
});

// body: Json Data
router.post('/', (req, res) => {
  console.log('POST /users/ called');
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

router.get('/auth/check', (req, res, next) => {
  console.log('users/auth 실행');
  console.log(`param ${req.param}`);
  const userEmail = jwtDecode(req.param.token).param;
  console.log(`userEmail : ${userEmail}`);
  const user = userService.getUser(userEmail);
  user
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send('유저가 없습니다. ', err);
    });
});

export default router;
