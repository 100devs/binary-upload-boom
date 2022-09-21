const express = require("express")
const router = express.Router()
const commentsController = require("../controllers/comments")

//Comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment)

router.put("/likeComment/:postId/:commentId", commentsController.likeComment)

router.delete(
    "/deleteComment/:postId/:commentId",
    commentsController.deleteComment
)

module.exports = router
