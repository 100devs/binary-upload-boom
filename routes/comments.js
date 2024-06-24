const express = require("express"); //Allow access to express methods
const router = express.Router(); //Allows router method
const commentsController = require("../controllers/comments")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now

router.post("/createComment/:id", commentsController.createComment); //Routes to controllers/comments and runs createComment() -> Accesses cloudinary upload protocol and creates post object


module.exports = router;
