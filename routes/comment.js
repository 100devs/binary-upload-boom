const express = require('express') 
const router = express.Router()
const commentController = require('../controllers/comments')
const { ensureAuth } = require('../middleware/auth')

// @description     Post comment to Post
// @route           POST /comment/createComment/:id
router.post('/createComment/:postId', ensureAuth, commentController.postComment)

// @description     Delete comment from Post
// @route           DELETE /comment/deleteComment/:id
router.delete('/deleteComment/:commentId', ensureAuth, commentController.deleteComment)

// @description     PUT like to Comment
// @route           PUT /comment/createComment/:id
router.put('/likeComment/:commentId', ensureAuth, commentController.likeComment)

module.exports = router