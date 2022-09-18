const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

router.post("/createComment/:id", commentsController.createComment);

// id == post id
router.put("/likeComment/:id/", commentsController.likeComment);

// future implementation
// router.get("/:id", ensureAuth, postsController.getPost);
// router.post("/createPost", upload.single("file"), postsController.createPost);
//router.delete("/deleteComment/:id", commentsController.deleteComment);
module.exports = router;
