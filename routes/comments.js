const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now


router.post("/createComment/:postId", ensureAuth, commentsController.createComment);

// router.put("/likePost/:postId", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
