const router = require('express').Router();
const ApiService = require('./apiService');

router.get('/mails', (req, res) => {
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getList(auth).then(messages => res.end(JSON.stringify(messages))));
});

router.get('/list', (req, res) => {
  console.log('GET /api/test');
  ApiService.authorize(ApiService.getCredentials(), (auth) => {
    ApiService.infos(auth).then((messages) => res.json(messages));
  });
});

router.get('/subject/:id', (req, res) => {
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.checkSubject(auth, req.params.id).then(messages => {
    res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
    console.log('subject : ', messages);
    res.end(messages)}));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getMessage(auth, id).then(message => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(message)
  }));
});

router.get('/info/:id', (req, res) => {
  const id = req.params.id;
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getReceipt(auth, id).then(message => {
    res.json(message)
  }));
});

module.exports = router;
