const router = require('express').Router();
const ApiService = require('../components/api/apiService');

router.get('/list', (req, res) =>  {
  console.log('GET /apis/token');
  // ApiService.authorize(ApiService.getCredentials(), ApiService.getList.then(messages=>res.end(JSON.stringify(messages))));
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getList(auth).then(messages=>res.end(JSON.stringify(messages))));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getMessage(auth, id).then(message => {
    console.log(message);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(message)
  }));
});

module.exports = router;
