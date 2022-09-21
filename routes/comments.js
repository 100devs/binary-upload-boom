const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");

//Post Routes - simplified for now
router.post("/createComment", commentsController.createComment);
router.put("/editComment/:id", commentsController.editComment);
router.delete("/deleteComment/:id", commentsController.deleteComment);
router.put("/likeComment/:id", commentsController.likeComment);

module.exports = router;
