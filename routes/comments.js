const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");


router.post("/addComment/:postId", commentsController.createComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;