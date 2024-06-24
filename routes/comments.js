const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

router.post("/createComment/:postID", commentsController.createComment);
router.put("/likeComment/:postID/:commentID", commentsController.likeComment);
router.delete("/deleteComment/:postID/:commentID", commentsController.deleteComment);

module.exports = router;
