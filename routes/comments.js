const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

//Comment Routes - simplified for now

router.post("/createComment/:postid", commentsController.createComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
