const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/createComment/:id", commentController.createComment);

router.put("/likeComment/:commentid/:postid", commentController.likeComment);

router.delete("/deleteComment/:commentid/:postid", commentController.deleteComment);

module.exports = router;