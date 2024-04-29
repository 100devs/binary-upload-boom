//import express
const express = require("express");
// sets router
const router = express.Router();
// imports the auth controller
const authController = require("../controllers/auth");
// imports home controller
const homeController = require("../controllers/home");
// imports post controller
const postsController = require("../controllers/posts");
//imports functions to make sure users are logged in or out
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
// serves the index file when get request to main page, sends straight to feed if authenticated
router.get("/", ensureGuest, homeController.getIndex);
//serves profile of the appropriate user w/ their id, ensures someone is logged in
router.get("/profile/:id", ensureAuth, postsController.getProfile);
//serves feed page, ensures someone is logged in
router.get("/feed", ensureAuth, postsController.getFeed);
//servers login page
router.get("/login", authController.getLogin);
//logins someone in
router.post("/login", authController.postLogin);
//logsout the user
router.get("/logout", authController.logout);
//serves signup page
router.get("/signup", authController.getSignup);
//signs up a user
router.post("/signup", authController.postSignup);

//exports the router
module.exports = router;
