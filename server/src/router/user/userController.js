import express from 'express';
import UserService from './userService';
import jwtDecode from 'jwt-decode';

const router = express.Router();

// '/users'
router.get('/', (req, res) => {
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
// router.post('/', (req, res) => {
//   UserService.createOne(req.body)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

router.post('/', (req, res) => {
  const body = req.body;
  const token = req.header('x-access-token') || req.params.token;

  const auth = jwt.decode(token);
  const email = auth.param;

  UserService.insertSubsInfo(email, body)
    .then((result) => {
      res.send({ status: 200, success: true, message: result});
    })
    .catch((err) => {
      throw err;
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
  const token = (req.header('x-access-token') || req.query.token);
  const userEmail = jwtDecode(token).param;
  UserService.getUser(userEmail)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send('유저가 없습니다. ', err);
    });
});

export default router;
