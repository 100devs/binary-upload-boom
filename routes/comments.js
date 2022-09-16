const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
//router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createComment/:id", commentsController.createComment);

//router.put("/likePost/:id", commentsController.likePost);

//router.delete("/deletePost/:id", commentsController.deletePost);

module.exports = router;
