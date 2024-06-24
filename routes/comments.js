const express = require('express')
const app = express()
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const commentsController = require('../controllers/comments')

router.post('/createComment/:id', commentsController.createComment)

module.exports = router