const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

//Comment Routes - simplified for now
router.post("/createComment", commentController.createComment);

module.exports = router;
