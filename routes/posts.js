// import express, create router and link with the also imported controller funcs

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// user must be auth'd
router.get("/:id", ensureAuth, postsController.getPost);

// create post route
router.post("/createPost", upload.single("file"), postsController.createPost);

// like post route
router.put("/likePost/:id", postsController.likePost);

// delete post route
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
