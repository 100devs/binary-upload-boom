const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const commentController = require("../controllers/comments");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createComment/:id", commentController.createComment);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteComment/:id/:commentid", commentController.deleteComment);

module.exports = router;
