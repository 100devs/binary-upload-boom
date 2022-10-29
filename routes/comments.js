const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth } = require("../middleware/auth");

router.post(
  "/:postId/createComment",
  ensureAuth,
  commentsController.createComment
);

module.exports = router;
