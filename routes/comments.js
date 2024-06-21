const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now

router.post("/createComment/:id", commentController.createComment);
router.delete("/deleteComment/:postId/:commentId", commentController.deleteComment);

module.exports = router;
