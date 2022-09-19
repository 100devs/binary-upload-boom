const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// router.get("/:id", ensureAuth, commentsController.getComment);

router.post("/createComment/:id", ensureAuth, commentsController.createComment);

router.put("/likeComment/:id", ensureAuth, commentsController.likeComment);

router.delete("/deleteComment", ensureAuth, commentsController.deleteComment);

module.exports = router;
