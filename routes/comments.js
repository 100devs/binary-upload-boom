const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/comment/:id", commentController.postComment);
router.put("/likeComment/:id", commentController.likeComment);
router.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = router;
