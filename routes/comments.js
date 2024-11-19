const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");

router.post("/createComment/:id", commentController.createComment);
router.put("/likeComment/:id", commentController.likeComment)

module.exports = router;
