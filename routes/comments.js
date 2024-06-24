const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");

router.post("/createComment/:id", commentController.createComment);

router.put("/likeComment/:postID/:commentID", commentController.likeComment);

router.delete(
  "/deleteComment/:postID/:commentID",
  commentController.deleteComment
);

module.exports = router;
