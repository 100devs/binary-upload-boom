const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:id", ensureAuth, commentController.createComment);

router.delete("/deleteComment/:commentId", ensureAuth, commentController.deleteComment);

module.exports = router;
