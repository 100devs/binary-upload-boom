const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createComment/:id", ensureAuth, commentsController.createComment);

router.put("/editComment/:postid/:commentid", ensureAuth, commentsController.editComment);

router.put("/likeComment/:postid/:commentid", commentsController.likeComment);

router.delete("/deleteComment/:postid/:commentid", ensureAuth, commentsController.deleteComment);

module.exports = router;
