const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.post("/postComment/:id", commentsController.postComment);

module.exports = router;
