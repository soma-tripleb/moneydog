import express from 'express';
import AuthService from './authService';

const router = express.Router();

router.post('/signUp', async (req, res) => {
  const userInfo = req.body.userInfo || '';

  if (userInfo === '') {
    res.status(400).json({status: 400, success: false, message: 'userInfo 정보가 없습니다.'});
    return;
  }

  if (!userInfo.hasOwnProperty('email')) {
    res.status(400).json({status: 400, success: false, message: 'email key 가 없습니다.'});
    return;
  } else if (!userInfo.hasOwnProperty('password')) {
    res.status(400).json({status: 400, success: false, message: 'password key 가 없습니다.'});
    return;
  } else if (!userInfo.hasOwnProperty('nickname')) {
    res.status(400).json({status: 400, success: false, message: 'nickname key 가 없습니다.'});
    return;
  }

  const result = await AuthService.register(userInfo);

  res.status(result.status).json(result);
});

router.post('/signIn', async (req, res) => {
  const userInfo = req.body.userInfo || '';

  if (userInfo === '') {
    res.status(400).json({status: 400, success: false, message: 'userInfo 정보가 없습니다.'});
    return;
  }

  if (!userInfo.hasOwnProperty('email')) {
    res.status(400).json({status: 400, success: false, message: 'email key 가 없습니다.'});
    return;
  } else if (!userInfo.hasOwnProperty('password')) {
    res.status(400).json({status: 400, success: false, message: 'password key 가 없습니다.'});
    return;
  }

  const result = await AuthService.login(req.body.userInfo);

  res.status(result.status).json(result);
});

router.post('/sessionCheck', async (req, res) => {
  const userInfo = req.body.userInfo || '';

  if (userInfo === '') {
    res.status(400).json({status: 400, success: false, message: 'userInfo 정보가 없습니다.'});
    return;
  }

  if (!userInfo.hasOwnProperty('jwt')) {
    res.status(400).json({status: 400, success: false, message: 'email key 가 없습니다.'});
    return;
  }

  const result = await AuthService.sessionCheck(req.body.userInfo);

  res.status(result.status).json(result);
});

export default router;
