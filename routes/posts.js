 const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

//upload.single('file') this is the middleware that allows us to upload files/images using multer
router.post("/createPost", upload.single("file"), postsController.createPost);

router.post("/createComment/:id", ensureAuth, postsController.createComment);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

router.delete("/deleteComment/:id/:postId", postsController.deleteComment);

module.exports = router;
