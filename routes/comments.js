const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.post("/createComment/:id", commentsController.createComment);
//change for comment
// router.put("/likeComment/:id", commentsController.likeComment);

// router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;

