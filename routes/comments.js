const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/editComment", commentsController.editComment);
router.post("/createComment" , commentsController.createComment);
router.delete("/deleteComment" , commentsController.deleteComment);
router.post("/deleteComment" , commentsController.deleteComment);
router.put("/likeComment/:id", commentsController.likeComment);
router.post("/likeComment/:id", commentsController.likeComment);

module.exports = router;
