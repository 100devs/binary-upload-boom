const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Post Routes - simplified for now
router.post("/createComment/:id", commentController.createComment);

router.delete("/deleteComment/:id", commentController.deleteComment);

router.put("/likeComment/:id", commentController.likeComment);

module.exports = router;