const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.post("/addComment/:id", commentsController.createComment);

//Add Like and Deletes later
//router.put("/likeComment/:id", commentsController.likePost);
//router.delete("/deleteComment/:id", commentsController.deletePost);

module.exports = router;
