// Use express to make using nodejs easier
const express = require("express");
//get a new router instance AND USE APP.USE LATER TO CALL THE ROUTER VAR
const router = express.Router();
//CONNECT AUTH FROM FOLDER OF CONTROLLER AND FILE OF AUTH
const authController = require("../controllers/auth");
//CONNECT HOME CONTROLLER FROM FOLDER OF CONTROLLER AND FILE OF HOME
const homeController = require("../controllers/home");
//CONNECT POST CONTROLLER FROM FOLDER OF CONTROLLER AND FILE OF posts
const postsController = require("../controllers/posts");
//CONNECT ENSUREAUTH FROM FOLDER OF MIDDLEWARE AND FILE OF AUTH AND ITS USED TO MAKE SURE THE USE IS ALWAYS LOGGED IN. WE USE THE CURLY BRACKETS AS DESTRUCTORS BUT IT COULD BE CHANGED TO GUEST ACCTS OR OTHERS USERS. 
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
//IF THE ROUTER GETS A "GET" REQUEST ON THE MAIN ROUTE, GO TO THE HOMECONTROLLER AND USE THE GETINDEX FUNCTION. REMEMBER TO GO TO THE CONTROLLER FOLDER AND HOME FILE TO GET THE FUNC
router.get("/profile", ensureAuth, postsController.getProfile);
//If the router gets a "GET" request on the profile route, ensure that the user is authenticated and then got to the postcontroller controller and go to the getprofile function
router.get("/feed", ensureAuth, postsController.getFeed);
//If the router gets a "GET" request on the feed route, ensure that the user is authenticated and then got to the postcontroller controller and go to the getFeed function
router.get("/login", authController.getLogin);
//If the router gets a "GET" request on the login route, go to the authController  and go to the getLogin function
router.post("/login", authController.postLogin);
//If the router gets a "POST" request on the login route, go to the authController  and go to the postLogin function
router.get("/logout", authController.logout);
//If the router gets a "GET" request on the logout route, go to the authController  and go to the logout function
router.get("/signup", authController.getSignup);
//If the router gets a "GET" request on the signup route, go to the authController  and go to the getSignup function
router.post("/signup", authController.postSignup);
//If the router gets a "POST" request on the signup route, go to the authController  and go to the postSignup function
module.exports = router;
