const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createComment/:id", commentController.createComment);

router.put("/likeComment/:id", commentController.likeComment);

//router.delete("/deleteComment/:id", commentController.deletePost);

module.exports = router;
