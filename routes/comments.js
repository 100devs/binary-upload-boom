const express = require("express"); //use express
const router = express.Router(); //use routers
const upload = require("../middleware/multer"); //use multer ??
const commentsController = require("../controllers/comments"); //use the comments controller ofc!
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //use the auth middleware

//Comment Routes - simplified for now


router.post("/createComment/:id", commentsController.createComment); //the controller for making a comment


router.delete("/deleteComment/:id", commentsController.deleteComment); //the controller for deleting a comment

module.exports = router; //export da router
