const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment);

router.put("/likeComment/:id", commentsController.likeComment);

router.put("/dislikeComment/:id", commentsController.dislikeComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);


module.exports = router;
