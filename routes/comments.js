// copy this from post routes then edit
const express = require("express");
const router = express.Router();
// add comments controller 
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for - now just need post
router.post("/createComment/:id", commentsController.createComment);



module.exports = router;
