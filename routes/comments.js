const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
//id is the comment.id
router.post("/createComment/:id", commentsController.createComment);

router.put("/likeComment/:id/", commentsController.likeComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

// future implementation
// router.get("/:id", ensureAuth, postsController.getPost);
// router.post("/createPost", upload.single("file"), postsController.createPost);
module.exports = router;
