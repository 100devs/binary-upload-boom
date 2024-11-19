const express = require('express');
const router = express.Router();

const CommentController = require("../controllers/comments");

router.post("/create/:id", CommentController.createComment);

router.put("/like/:id", CommentController.likeComment);

router.delete("/delete/:id", CommentController.deleteComment);

module.exports = router;