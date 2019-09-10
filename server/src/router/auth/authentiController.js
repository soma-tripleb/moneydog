import express from 'express';
import AuthService from './authService';
import JWTAuthenticationToken from '../../security/jwtAuthenticationToken';

const router = express.Router();

router.post('/signUp', async (req, res) => {
  const userInfo = req.body.userInfo || '';

  if (userInfo == '') {
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
  const loginResponse = await AuthService.login(req.body.userInfo);
  const email = req.body.userInfo.email;

  if (loginResponse === 200) {
    const token = JWTAuthenticationToken.createJWT(email);

    res.cookie('user', token);

    console.log(token);

    res.status(200).json({status: 200, message: '로그인에 성공했습니다.', token: token});
  } else if (loginResponse === 400) {
    res.status(400).json({status: 400, message: '없는 아이디 입니다.'});
  } else {
    res.status(409).json({status: 409, message: '비밀번호가 틀렸습니다.'});
  }
});

export default router;
