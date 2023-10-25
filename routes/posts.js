const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Post Routes

// @desc Fetch a post with the id designated by the URL fragment ':id'.
// @route GET /post/:id
router.get("/:id", ensureAuth, postsController.getPost);
// @desc Creates a post and uses the multer middleware to upload an accompanying file.
// @route POST /post/createPost
router.post("/createPost", upload.single("file"), postsController.createPost);
// @desc Updates like status of a post with the provided id.
// @route PUT /post/likePost/:id
router.put("/likePost/:id", postsController.likePost);
// @desc Deletes the post with the provided id.
// @route DELETE /post/deletePost/:id
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
