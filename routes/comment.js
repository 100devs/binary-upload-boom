const express = require('express') 
const router = express.Router()
const commentController = require('../controllers/comments')
const { ensureAuth } = require('../middleware/auth')

router.post('/createComment/:postId', ensureAuth, commentController.postComment)


router.delete('/deleteComment/:commentId', ensureAuth, commentController.deleteComment)


router.put('/likeComment/:commentId', ensureAuth, commentController.likeComment)

module.exports = router