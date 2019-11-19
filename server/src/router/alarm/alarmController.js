import express from 'express';
import CreateHtml from './createHtml';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

const router = express.Router();

/*
 메일 보내기
 param :  User Email from JWT token , HTML 코드 or value 들
 return : success | fail
*/
router.post('/', (req, res) => {

  const token = req.header('x-access-token') || req.params.token;
  const userEmail = jwt.decode(token).param;
  const userSubscriptions = req.body.userSubscriptions;

  // console.log(userSubscriptions);
  // console.log(new Date().getMonth());

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${[process.env.GoogleMailID]}`,
      pass: `${[process.env.GoogleMailPW]}`,
    }
  });

  const mailOptions = {
    from: `noreply@moneydog.io`, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: userEmail, // 수신 메일 주소
    subject: 'MoneyDog Report', // 제목
    html: CreateHtml.createHtml(new Date().getMonth()+1, userSubscriptions)
  };

  console.log(userEmail);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('success');
});

export default router;
