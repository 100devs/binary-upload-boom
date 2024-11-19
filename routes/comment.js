const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createComment/:id", commentsController.createComment);
router.delete("/deleteComment/:commentid/:postid", commentsController.deleteComments);

module.exports = router;
