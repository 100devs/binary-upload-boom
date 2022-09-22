const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.post("/createComment", commentController.createComment);


module.exports = router