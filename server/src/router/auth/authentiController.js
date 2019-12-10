import express from 'express';
import AuthService from './authService';

const router = express.Router();

router.post('/signUp', async (req, res) => {
  const userInfo = req.body.userInfo || '';

  if (!AuthService.checkParameter(userInfo) || !userInfo.hasOwnProperty('nickname')) {
    return res.status(400).json({status: 400, success: false, message: 'id 또는 password를 확인해주세요.'});
  }

  const result = await AuthService.register(userInfo);
  return res.status(result.status).json(result);
});

router.post('/signIn', async (req, res) => {
  const userInfo = req.body.userInfo || '';
  if (!AuthService.checkParameter(userInfo)) {
    return res.status(400).json({status: 400, success: false, message: 'id 또는 password를 확인해주세요.'});
  }
  const result = await AuthService.login(req.body.userInfo);
  return res.status(result.status).json(result);
});

export default router;
