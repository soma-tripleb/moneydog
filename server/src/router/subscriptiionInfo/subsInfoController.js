import express from 'express';
import SubsInfoService from './subsInfoService';

const router = express.Router();


router.get('/', (req, res) => {
  const token = (req.header('x-access-token') || req.query.token);

  if (typeof token === 'undefined') {
    return res.status(400).json({status: 400, success: false, message: '토큰이 필요합니다.'});
  }

  SubsInfoService.getSubsInfo(token)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post('/', (req, res) => {
  const token = (req.header('x-access-token') || req.query.token);

  if (typeof token === 'undefined') {
    return res.status(400).json({status: 400, success: false, message: '토큰이 필요합니다.'});
  }

  SubsInfoService.addSubsInfo(req.body, token)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put('/', (req, res) => {
  const token = (req.header('x-access-token') || req.query.token);

  if (typeof token === 'undefined') {
    return res.status(400).json({status: 400, success: false, message: '토큰이 필요합니다.'});
  }

  SubsInfoService.updateSubsInfo(req.body, token)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/', (req, res) => {
  const token = (req.header('x-access-token') || req.query.token);

  if (typeof token === 'undefined') {
    return res.status(400).json({status: 400, success: false, message: '토큰이 필요합니다.'});
  }

  SubsInfoService.deleteSubsInfo(req.body, token)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});


export default router;
