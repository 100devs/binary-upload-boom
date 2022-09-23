const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:id", ensureAuth, commentsController.createCreate);

router.put("/likeComment/:id", commentsController.likeComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
