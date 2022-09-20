const express = require("express"); // import express from "express";
const router = express.Router(); //express.Router() for creating a router object from express module which is used to handle the routes
const commentsController = require("../controllers/comments"); //import commentsController from "../controllers/comments"
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //purpose of this is to ensure that the user is authenticated before they can access the routes in this file

//Comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment); //create a comment on a post with id = :id


module.exports = router; //export the router object to be used in the main app file, the main app file needs this because it needs to know what routes are available to it