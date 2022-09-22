const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/:id", ensureAuth, commentsController.getComment);

router.post("/createComment/:postid/:commentid?", commentsController.createComment);

router.put("/edit/:id", commentsController.editComment);

router.put("/upvote/:id", commentsController.upvoteComment);

router.put("/downvote/:id", commentsController.downvoteComment);

router.delete("/deleteComment/:commentid/:postid", commentsController.deleteComment);   

module.exports = router;