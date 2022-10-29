const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const {
    ensureAuth,
    ensureGuest
} = require("../middleware/auth");

router.get("/:postId", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:postId", postsController.likePost);

router.delete("/deletePost/:postId", postsController.deletePost);

module.exports = router;