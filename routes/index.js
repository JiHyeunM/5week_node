const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
// const commentsRouter = require('./comments.routes');
const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const likesRouter = require('./likes.routes');

router.use('/posts/', likesRouter);
// router.use('/comments/',commentsRouter);
router.use('/signup/', signupRouter);
router.use('/login/', loginRouter);
router.use('/posts/',postsRouter);

module.exports = router;