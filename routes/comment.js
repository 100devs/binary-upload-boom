const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//comment Routes - simplified for now

router.post("/postComment/:id", commentsController.postComment);


module.exports = router;