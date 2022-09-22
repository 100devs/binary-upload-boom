const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");

router.post("/createComment/:id", commentController.createComment);

module.exports = router;