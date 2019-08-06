var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Expresszz' });
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested_with, Content-Type, Accept");
  res.json({name:"melon"});
});

module.exports = router;
