const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware")
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController(); // 가져온 모듈에 대한 클래스를 선언하는 부분이다

router.put('/:postId/like', authMiddleware, likesController.putLikes);
router.get('/like', authMiddleware, likesController.getLikes);

module.exports = router;