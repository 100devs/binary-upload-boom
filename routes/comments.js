const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth } = require("../middleware/auth");

//Comment Routes
router.post("/createComment/:id", ensureAuth, commentsController.createComment);

module.exports = router;