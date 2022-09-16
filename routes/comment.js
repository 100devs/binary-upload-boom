const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const commentController = require("../controllers/comment");

router.post("/createComment/:id",  commentController.createComment);
router.put("/likeComment/:id",  commentController.likeComment);
router.put("/unlikeComment/:id",  commentController.unlikeComment);



module.exports = router;
