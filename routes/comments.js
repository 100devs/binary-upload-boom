const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comments')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//CommentRoutes - simplified for now
router.post('/createComment/:id', commentController.createComment)

router.delete('/deleteComment/:id', commentController.deleteComment)

module.exports = router
