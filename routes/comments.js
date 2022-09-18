const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", commentsController.getComment);

router.post("/createComment/:id", ensureAuth, commentsController.createComment);
router.put("/likeComment/:id", commentsController.likeComment);
router.delete("/deleteComment/:id", commentsController.deleteComment); 
//we have more specificity in our routes because we like specificity. e.g. likeComment/:id instead of just /:id

module.exports = router;
