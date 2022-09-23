const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.put("/likePostFromFeed/:id", postsController.likePostFromFeed);

router.delete("/deletePost/:id", postsController.deletePost);

router.post('/:id/createComment', postsController.createComment)

module.exports = router;
