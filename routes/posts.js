const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/Comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Comment = require("../models/comment");

router.post("/createComment/:id", ensureAuth, commentsController.createComment);
module.exports = router;
