const express = require ("express")
const router = express.Router()
const commentController = require("../controllers/comments")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//post routes for comments 

router.post('/createComment/:id', commentController.createComment)

module.exports = router