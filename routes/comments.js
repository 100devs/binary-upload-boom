const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments"); // NEED TO CREATE
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:id", commentsController.createComment);

module.exports = router;