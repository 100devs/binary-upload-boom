const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes
router.post("/addComment/:id", ensureAuth, commentsController.addComment);

router.put("/likeComment/:postId/:commentId", commentsController.likeComment);


module.exports = router;
