const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:postId", commentsController.createComment);

module.exports = router;