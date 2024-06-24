const router = require("express").Router();
const commentController = require("../controllers/comments");

router.post("/create/:postID", commentController.createComment);
router.put("/like/:id", commentController.likeComment);
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;