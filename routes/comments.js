const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
//comments Routes - simplified for now

router.post("/createComment/:_id",  commentsController.createComment);



module.exports = router;
