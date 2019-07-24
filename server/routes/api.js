const router = require('express').Router();
const realine = require('readline');
const {google} = require('googleapis');
const fs = require('fs');
const ApiService = require('../components/api/apiService');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = '../env/token.json';

router.get('/list', (req, res) =>  {
  console.log('GET /apis/token');
  // ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getList(auth).then(messages=>res.end(JSON.stringify(messages))));
  ApiService.authorize(ApiService.getCredentials(), auth => ApiService.getList(auth).then(messages=>res.end(JSON.stringify(messages))));

});

module.exports = router;
