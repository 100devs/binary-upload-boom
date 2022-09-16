const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// @desc    get post with given id
// @route   GET /:id
// router.get("/:id", ensureAuth, commentsController.getPost);

// @desc    process create post form
// @route   POST /post/createPost
router.post("/createComment/:id", commentsController.createComment);

// @desc    Update post likes field
// @route   PUT/likePost/:id
// router.put("/likePost/:id", commentsController.likePost);

// @desc    delete post at id
// @route   DELETE /deletePost/:id
// router.delete("/deletePost/:id", commentsController.deletePost);

module.exports = router;
