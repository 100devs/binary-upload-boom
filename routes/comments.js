const express = require("express"); // loads the express package into the file
const router = express.Router(); // creates a router object
const commentsController = require("../controllers/comments"); // connects the route to the comments controller
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // 

//Comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment); // if a post request is made to this url, hand the request over to the createComment function in the comments controller

module.exports = router; // when another file requires this file, it will give it the router data