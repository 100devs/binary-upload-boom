const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.js');
const { ensureAuth } = require('../middleware/auth.js');

router.post('/:id', ensureAuth, commentsController.postComment);

router.put('/likeComment/:id', ensureAuth, commentsController.likeComment);

router.delete('/deleteComment/:id', ensureAuth, commentsController.deleteComment);

module.exports = router