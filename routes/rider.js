var express = require('express');
var router = express.Router();

const db = require('../models/index');

router.post('/signup', function(req, res, next) {
  db.insertData('rider', req.body);
  res.send('respond with a resource');
  // res.render('index', { title: 'Express' });
});

module.exports = router;
