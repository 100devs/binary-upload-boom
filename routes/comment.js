const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/createComment/:id", ensureAuth, commentController.createComment);
router.delete(
  "/deleteComment/:postid/:commentid",
  commentController.deleteComments
);
module.exports = router;
