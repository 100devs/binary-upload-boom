const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now

router.post("/createComment/:id", commentsController.createComment);       //here :id is the post id

router.put("/likeComment/:id", commentsController.likeComment);     //here :id is the comment id

router.delete("/deleteComment/:id", commentsController.deleteComment);      //here :id is the comment id

module.exports = router;