const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/addComment/:id", ensureAuth, commentController.addComment);
router.put("/likeComment/:id", ensureAuth, commentController.likeComment);


module.exports = router;