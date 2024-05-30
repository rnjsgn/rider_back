var express = require('express');
var router = express.Router();
const JWTManager = require('../utils/JWTManager');
const Authenticator = require('../middleware/Authenticator');
// const cors = require('cors');

const db = require('../models/index');

router.get('/', Authenticator, async function(req, res, next) {
  console.log('로그인 확인')
  console.log(req.userInfo);
})

// 광고주 회원가입
router.post('/signup', function(req, res, next) {
  db.insertData('owner', req.body);
  res.send('respond with a resource');
  // res.render('index', { title: 'Express' });
});

// 광고주 로그인
router.post('/signin', async function(req, res, next) {
  const loginData = await db.findOne('owner', req.body);
  const data = {
    no : loginData.no,
    name: loginData.name,
    userType: '광고주'
  }
  console.log(loginData)
  // console.log(data)
  
  if(loginData !== null) {
    const jwt = new JWTManager()
    const token = await jwt.createToken(data);
    console.log(token)

    return res.status(200).json({
      data : token
    })
  }

  res.send('respond with a resource');
})

// 광고주 정보 불러오기
router.get('/all', async function(req, res, next) {
  const data = await db.findData('owner');
  // res.send('respond with a resource');
  // console.log(data[0].ad)
  res.status(200).json({
    data
  });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
