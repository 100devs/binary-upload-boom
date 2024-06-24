const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, commentsController.getComment);
router.post("/createComment/:id", commentsController.createComment);
// router.put("/likeComment/:id", commentsController.likeComment);
// router.delete("/deleteComment/:id", commentsController.deleteComment);

// http://localhost:8000/comments/likeComment/:id

module.exports = router;
