const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes 

router.post("/createComment/:postId", commentController.createComment);

router.put("/likeComment/:commentId/:postId", commentController.likeComment);

router.delete("/deleteComment/:commentId/:postId", commentController.deleteComment);

module.exports = router;
