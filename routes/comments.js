const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

router.get("/", commentsController.getComments);

router.post("/new/:id", commentsController.createComment);

module.exports = router;
