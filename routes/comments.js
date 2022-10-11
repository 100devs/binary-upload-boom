const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
// router.get("/:id", ensureAuth, commentsController.getPost);

router.post("/createComment/:id", commentsController.createComment);

// router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
