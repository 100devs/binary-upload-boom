const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:postId", ensureAuth, commentsController.createComment);
router.delete("/deleteComment/:postId/:commentId", ensureAuth, commentsController.deleteComment);

module.exports = router;
