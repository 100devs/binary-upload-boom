const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//comment 
//@/comments/
router.post("/createComment/:id", commentsController.createComment);
router.put("/like/:comment_id/:post_id", commentsController.addLike);

module.exports = router;
