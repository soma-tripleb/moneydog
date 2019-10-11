import express from 'express';
import AuthService from './authService';

const router = express.Router();

router.post('/signUp', async (req, res) => {
  const userInfo = req.body.userInfo || '';
  if (!AuthService.checkParameter(userInfo)) {
    return res.status(400).json({status: 400, success: false, message: 'userInfo 정보가 부족합니다!'}).end();
  }
  const result = await AuthService.register(userInfo);
  return res.status(result.status).json(result);
});

router.post('/signIn', async (req, res) => {
  const userInfo = req.body.userInfo || '';
  if (!AuthService.checkParameter(userInfo)) {
    return res.status(400).json({status: 400, success: false, message: 'userInfo 정보가 부족합니다!'}).end();
  }
  const result = await AuthService.login(req.body.userInfo);
  return res.status(result.status).json(result);
});

export default router;
