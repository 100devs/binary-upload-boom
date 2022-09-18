const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createComment/:id", commentController.createComment);

router.put("/likeComment/:id", commentController.likeComment);

router.delete("/deleteComment/:postid/:commentid", commentController.deleteComment);
// parameters in path come from the req.params in our controller

module.exports = router;