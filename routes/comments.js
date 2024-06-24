const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createComment/:idPost", commentsController.createComment);

router.put("/likeComment/:idComment", commentsController.likeComment);

router.put("/deleteComment/:idComment", commentsController.softDeleteComment)

module.exports = router;