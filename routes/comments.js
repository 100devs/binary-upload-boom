const express = require("express");
const router = express.Router();
const commentsController = require("../contollers/comments");
const { ensureAuth } = require("../middleware/auth");

router.post("/createComment/:id", commentsController.postComment);

module.exports = router;
