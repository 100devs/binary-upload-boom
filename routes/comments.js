const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments')

router.post("/createComment/:id", commentsController.createComment);
router.put("/likeComment/:postId/:commentId", commentsController.likeComment)
// router.put("/dislikeComment/:id", postsController.dislikeComment)
// router.delete("/deleteComment/:id", postsController.deleteComment)

module.exports = router;