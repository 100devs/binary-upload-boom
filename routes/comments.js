const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.post("/createComment/:id", commentsController.createComment);

//router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
