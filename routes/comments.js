const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comments')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/createComment/:id", commentController.createComment);
router.put("/likeComment/:id/:postId", commentController.likeComment);
router.delete("/deleteComment/:id/:postId", commentController.deleteComment);

module.exports = router;
