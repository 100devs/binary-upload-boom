const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const postsController = require("../controllers/posts");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Post Routes - simplified for now

// SOCIAL MEDIA POSTS
// get a post by id
router.get("/:id", ensureAuth, postsController.getPost);

// create a social media post
router.post("/createPost", upload.single("file"), postsController.createPost);

// like a social media post - through form override 
router.put("/likePost/:id", postsController.likePost);

// delete a social media post - through form override
router.delete("/deletePost/:id", postsController.deletePost);


// COMMENTS
// add a comment to a social media post
router.post("/createComment/:id", postsController.createComment);

// delete a comment to a social media post
router.delete("/deleteComment/:postid/:commentid", postsController.deleteComment);



module.exports = router;
