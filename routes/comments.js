const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/create/:id", ensureAuth, commentsController.createComment);
router.put("/like/:id", ensureAuth, commentsController.likeComment);


module.exports = router;
