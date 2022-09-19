const express = require("express");
const commentsController = require("../controllers/comments");
const router = express.Router();

router.post("/addComment/:postId", commentsController.addComment);
router.put("/editComment/:id", commentsController.editComment);
router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
