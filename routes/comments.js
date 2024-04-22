const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");

//Main Routes - simplified for now
router.post("/:id", commentController.writeComment);

module.exports = router;