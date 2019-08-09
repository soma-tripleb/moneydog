const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({name: 'melon'});
});

module.exports = router;
