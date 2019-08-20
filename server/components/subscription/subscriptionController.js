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

router.get('/:name', (req, res) => {
  console.log('GET /subscriptions/:name name : ', req.params.name);
  subscriptionService.getSubscriptionByName(req.params.name)
    .then((subscription) => {
      res.send(subscription);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
