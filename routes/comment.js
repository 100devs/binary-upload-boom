const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comment');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Post Routes - simplified for now
router.post('/createComment/:postId', commentsController.createComment);

router.put('/likeComment/:id', commentsController.likeComment);

router.delete('/deleteComment/:id', commentsController.deleteComment);

module.exports = router;
