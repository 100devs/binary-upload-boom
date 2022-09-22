const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

//sends control to controller based on the given id
router.post("/createComment/:id", commentController.createComment);

router.delete("/deleteComment/:postid/:commentid", commentController.deleteComment);

module.exports = router;