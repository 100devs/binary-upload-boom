//go to post route copy everything

const express = require("express");
const router = express.Router();

// const upload = require("../middleware/multer");

const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//comment Routes - simplified for 
//  ":id" now parm id grab value out of url
//query parameter 
// router.get("/:id", ensureAuth, postsController.getPost);

//submit form, server js sender us to this router, 
//router hears /createComment/:id, then points to commentsController with createComment
//method
router.post("/createComment/:id", commentsController.createComment);
//go to controlers folder create file, comments.js


// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;