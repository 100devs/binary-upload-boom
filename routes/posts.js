//imports express
const express = require("express");
//sets the router
const router = express.Router();
// gets the multer middleware
const upload = require("../middleware/multer");
// imports post controller
const postsController = require("../controllers/posts");
//imports functions to make sure user is signed in or out
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
//gets a post - /post/:id, uses the id to display correct post, ensures logged in
router.get("/:id", ensureAuth, postsController.getPost);

//creates a post, multer middleware to upload the file
router.post("/createPost", upload.single("file"), postsController.createPost);

// likes a post, uses id param to do so /post/likePost/:id
router.put("/likePost/:id", postsController.likePost);

//deletes a post, uses id to so /post/deletePost/:id
router.delete("/deletePost/:id", postsController.deletePost);

//creates a comment, uses the POSTS id to connect it /post/createComment/:postID
router.post("/createComment/:postId", postsController.createComment);

// likes a comment, uses comment ID to do so, /post/likeComment/:id
router.put("/likeComment/:id", postsController.likeComment);

// deletes a comment, uses comment ID to do, /post/deleteComment/:id
router.delete("/deleteComment/:id", postsController.deleteComment);

//exports the router
module.exports = router;
