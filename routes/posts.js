const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);
router.post("/createPost", upload.single("file"), postsController.createPost);
router.put("/likePost/:id", postsController.likePost);
// Comments are only ever accessed via Posts as embedded documents,
// so it makes sense for the comments to be part of the Post routes.
router.post("/comment/:id", ensureAuth, postsController.commentPost);
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
