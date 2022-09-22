const express = require('express');
const router = express.Router();
const commentController = require("../controllers/comments");


//Post Routes - simplified for now

router.post("/createComments/:id", commentController.createComment);



module.exports = router;