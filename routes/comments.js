const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, commentsController.getComment);

router.post("/createComment/:id", commentsController.createComment);

// router.put("/likeComment/:id", commentsController.likeComment);

// router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
