const express = require("express");
const { deleteComments } = require("../controllers/comment");
const router = express.Router();

const commentController = require("../controllers/comment");

router.post("/createComment/:id", commentController.createComment);
router.delete(
  "/deleteComment/:postId/:commentId",
  commentController.deleteComments
);

module.exports = router;
