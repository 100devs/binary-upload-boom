const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createComment/:id", commentsController.createComment);

//router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;