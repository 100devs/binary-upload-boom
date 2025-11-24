const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Create a comment
router.post("/createComment/:id", commentsController.createComment);

// Delete a comment
router.delete("/deleteComment/:id", ensureAuth, commentsController.deleteComment);

module.exports = router;
