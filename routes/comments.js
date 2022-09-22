const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/comments')

//Comment Routes - simplified for now

router.post('/:id', commentsController.createComment)

// router.put('/likePost/:id', postsController.likePost)

// router.delete('/deletePost/:id', postsController.deletePost)

module.exports = router
