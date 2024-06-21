const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
//const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Routes - Adjusted with /createComment/:id and commentsController.getPost for the Comment Section Assignment and removed ensureAuth
router.post("/createComment/:id", commentsController.createComment);

//router.post("/createPost", upload.single("file"), postsController.createPost);

//router.put("/likePost/:id", postsController.likePost);

//router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
