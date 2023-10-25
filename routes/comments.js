const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.get("/", commentsController.getComments);
router.post("/", commentsController.createComment);
router.delete("/", commentsController.deleteComment);

module.exports = router;
