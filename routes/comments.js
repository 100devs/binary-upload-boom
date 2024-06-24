const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// id is the post ID
router.post("/createComment/:id", commentsController.createComment);

module.exports = router;