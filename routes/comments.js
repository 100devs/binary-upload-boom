const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth } = require("../middleware/auth");

// Every comment action requires a logged-in user
router.post(
  "/createComment/:postId",
  ensureAuth,
  commentsController.createComment,
);
router.post("/reply/:commentId", ensureAuth, commentsController.createReply);
router.put("/like/:id", ensureAuth, commentsController.likeComment);
router.put("/dislike/:id", ensureAuth, commentsController.dislikeComment);
router.delete("/delete/:id", ensureAuth, commentsController.deleteComment);

module.exports = router;
