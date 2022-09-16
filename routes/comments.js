const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");


//Post Routes - simplified for now

router.post("/createComment/:id", commentsController.createComment);



module.exports = router;