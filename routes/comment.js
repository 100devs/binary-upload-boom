const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const commentController = require('../controllers/comment')

router.get("/:id", commentController.getComments)
router.post("/createComment", commentController.createComment)

module.exports = router