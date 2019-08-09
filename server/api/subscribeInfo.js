var express = require('express');
var router = express.Router();

import SubscribeInfo from '../models/subscribeInfo';

// Subscribe 전체 조회
router.get('/', (req, res) => {
  SubscribeInfo.find({}, (err, service) => {
    if (err) return res.state(500).send("SubscribeInfo 전체 조회 실패.");
    res.json(service);
  });
});

// Subscribe 조회 userID 로 조회
router.get('/:userId', (req, res) => {
  SubscribeInfo.find({userId: req.params.userId}, (err, service) => {
    if (err) return res.state(500).send("SubscribeInfo 조회 실패.");
    if (!service) return res.state(404).send("SubscribeInfo 없음.");
    res.json(service);
  });
});

//Subscribe 생성
router.post('/', (req, res) => {
  SubscribeInfo.create(
      {
        userId: req.body.userId,
        serviceName: req.body.serviceName,
        paymentDay: req.body.paymentDay,
        price: req.body.price,
        currencyUnit: req.body.currencyUnit,
        paymentPeriod: req.body.paymentPeriod,
      },
      (err, service) => {
        if(err) return res.status(500).send("ServiceInfo 정보 생성 실패.");
        res.json(service);
      }
  )
});

module.exports = router;



