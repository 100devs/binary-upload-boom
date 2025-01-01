//imports
const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//crud operations for comments
router.post("/createComment/:id", commentsController.createComment);

router.put("/likeComment/:id/:post", commentsController.likeComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
