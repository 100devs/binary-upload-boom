const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

router.post("/createConment/:id",  commentController.createComment);

module.exports = router;