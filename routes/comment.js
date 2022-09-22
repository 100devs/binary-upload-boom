const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const commentController = require('../controllers/comments');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.post("/createComment/:id", commentsController.createComment);
router.delete('/deleteComment/:postid/:commentid', commentsController.deleteComments)

//router.put("/likeComment/:id", postsController.likeComment);
//
//router.delete("/deleteComment/:id", postsController.deleteComment);

module.exports = router;
