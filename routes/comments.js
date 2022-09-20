const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Comment Routes - simplified for now

// comment route to create post and requiring multer middleware to handle upload
router.post("/createComment/:id", commentsController.createComment);

router.put("/likeComment/:postid/:commentid", commentsController.likeComment);

router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComment)

module.exports = router;