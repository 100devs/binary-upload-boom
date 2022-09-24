const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

//Post Routes - simplified for now
router.post("/create", commentsController.createComment);

router.put("/like", commentsController.likeComment);

router.delete("/delete/:id", commentsController.deleteComment);

module.exports = router;
