const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('MoneyDog Server API');
});

module.exports = router;
