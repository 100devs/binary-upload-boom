const express = require("express");
const router = express.Router();
const { createComment, deleteComment } = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/:id", createComment);
router.delete("/deleteComment/:id", deleteComment);

module.exports = router;
