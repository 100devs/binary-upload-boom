const express = require("express");
const router = express.Router();
const commentsContoller = require('../controllers/comments')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post('/createComment/:id', commentsContoller.createComment)

module.exports = router;