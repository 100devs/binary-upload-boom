const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now
router.post("/createComment/:id", upload.single("file"), commentsController.createComment);

module.exports = router;