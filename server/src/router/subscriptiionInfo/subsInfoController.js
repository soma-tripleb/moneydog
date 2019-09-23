import express from 'express';
import SubsInfoService from './subsInfoService';

const router = express.Router();

router.get('/', (req, res) => {

  const token = (req.header('x-access-token') || req.query.token);

  SubsInfoService.getSubsInfo(token)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      res.send(e);
    });
});


export default router;
