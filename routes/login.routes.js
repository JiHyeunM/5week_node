const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController(); // 가져온 모듈에 대한 클래스를 선언하는 부분이다

router.post('/', loginController.login);

module.exports = router;