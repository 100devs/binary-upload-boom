const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, commentController.getComments);

router.post("/createComment/:id", ensureAuth, commentController.createComment);

// router.delete("/deleteComment/:id", ensureAuth, commentController.deleteComment);

module.exports = router;
