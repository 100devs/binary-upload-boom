const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/:id", ensureAuth, commentsController.getComment);

router.post("/createComment/:postid/", commentsController.createComment);

router.post("/createReply/:postid/:commentid?", commentsController.createReply);

router.put("/edit/:id", commentsController.editComment);

router.put("/upvote/:id", commentsController.upvoteComment);

router.put("/downvote/:id", commentsController.downvoteComment);

router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComment);

module.exports = router;