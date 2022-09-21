const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Comment Routes 

router.post("/createComment", commentsController.createComment);

router.put("/likeComment/:id", commentsController.likeComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router; 