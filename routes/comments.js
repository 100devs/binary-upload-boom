const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Route - simplified for now
router.post("/createComment/:id", commentsController.createComment);

router.put("/likeComment/:id", commentsController.likeComment);

module.exports = router;
