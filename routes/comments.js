const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.post("/addComment/:id", commentsController.addComment);

router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComment);

module.exports = router;