const express = require("express")
const router = express.Router()
const commentsController = require("../controllers/comment")

//Post Routes - simplified for now

router.post("/createComments/:id", commentsController.createComments)
//its waiting on two things postid and commentid
router.delete("/deleteComments/:postId/:commentsId", commentsController.deleteComments)

module.exports = router
