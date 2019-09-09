const router = require('express').Router();

const subscriptionService = require('./subscriptionService');

router.get('/', (req, res) => {
  console.log('GET /subscriptions request called');
  subscriptionService.getSubscriptionList()
    .then((subscriptions) => {
      res.send(subscriptions);
    })
    .catch((err) => {
      console.log('error 발생');
      res.send(err);
    });
});

router.get('/:response', (req, res) => {
  console.log('response : ', req.params.response);
  subscriptionService.getSubscription(req.params.response)
    .then((subscription) => {
      res.send(subscription);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/', (req, res) => {
  console.log('POST /subscriptions 사용자가 입력한 구독 서비스 정보');
  console.log(req.body);
});

module.exports = router;
