const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createComment", commentsController.createComment);

module.exports = router;
