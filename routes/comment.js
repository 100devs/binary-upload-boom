const express = require("express");
const router = express.Router();
const postsController = require("../controllers/comment");

router.post("/createComment", commentController.createComment);

module.exports = router;
