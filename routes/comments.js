const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments')



router.post("/addComment/:id", commentsController.addComment);

router.put('/likeComment/:id', commentsController.likeComment);


module.exports = router;