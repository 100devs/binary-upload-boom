const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.post("/createComment/:postId", commentsController.createComment)

module.exports = router;