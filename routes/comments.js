const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const commentsController = require("../controllers/comments");


router.post("/createComment/:id",  commentsController.createComment);

module.exports = router;