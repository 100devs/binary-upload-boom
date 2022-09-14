const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// @desc    get post with given id
// @route   GET /:id
router.get("/:id", ensureAuth, postsController.getPost);

// @desc    process create post form
// @route   POST /post/createPost
router.post("/createPost", upload.single("file"), postsController.createPost);

// @desc    Update post likes field
// @route   PUT/likePost/:id
router.put("/likePost/:id", postsController.likePost);

// @desc    delete post at id
// @route   DELETE /deletePost/:id
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
