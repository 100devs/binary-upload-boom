const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createComment", commentsController.createComment);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
