const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments")

router.post("/createComment/:id", commentController.createComment); //route for creating comments on a post; :id parameter tells DB which post the comment is being added to

module.exports = router;