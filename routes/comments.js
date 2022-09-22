const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/addComment/:postId", ensureAuth, commentsController.addComment);

router.put("/likeComment/:id", ensureAuth, commentsController.likeComment);

router.delete("/deleteComment/:id", ensureAuth, commentsController.deleteComment);

module.exports = router;
