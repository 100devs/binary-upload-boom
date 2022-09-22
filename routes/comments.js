const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comments')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//CommentRoutes - simplified for now
router.post('/createComment/:id', commentController.createComment)

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router
