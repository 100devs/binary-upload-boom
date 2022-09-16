const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.post("/createComment/:id", commentController.createComment);

module.exports = router;
