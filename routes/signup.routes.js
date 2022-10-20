// URI와 미들웨어, HTTP메서드를 설정 / 컨트롤러와 연결하는 역할
const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController(); // 가져온 모듈에 대한 클래스를 선언하는 부분이다

router.post('/', signupController.signup);

module.exports = router;