var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // res.render('index', { title: 'Expresszz' });
  res.json({name:"melon"});
});

module.exports = router;
