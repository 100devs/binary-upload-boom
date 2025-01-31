//USE EXPRESS TO MAKE NODEJS EASIER
const express = require("express");
//get a new router instance AND USE APP.USE LATER TO CALL THE ROUTER VAR
const router = express.Router();
//import the configuration in the multer.js located in the middleware folder. The multer allows you to upload images

const commentsController = require("../controllers/comments");
//CONNECT ENSUREAUTH FROM FOLDER OF MIDDLEWARE AND FILE OF AUTH AND ITS USED TO MAKE SURE THE USE IS ALWAYS LOGGED IN. WE USE THE CURLY BRACKETS AS DESTRUCTORS BUT IT COULD BE CHANGED TO GUEST ACCTS OR OTHERS USERS.
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now


router.post("/createComment/:id", commentsController.createComment);
////IF THERES A POST REQUEST ON THE CreatePOST ROUTE, THE ROUTER WILL USE THE MULTER.JS FUNC TO UPLOAD A FILE  AND THE POSTCONTROLLER WILL USE CREATEPOST FUNCTION

router.put("/likeComment/:id", commentsController.likeComment);
//IF THERES A PUT REQUEST ON THE LIKEpost ROUTE WITH THE PARAM OF /:ID FOR A SPECIFIC POST, THE ROUTER WILL USE THE POSTCONTROLLER WILL USE LIKEPOST FUNCTION

router.delete("/deleteComment/:id", commentsController.deleteComment);
//IF THERES A DELETE REQUEST ON THE DELETEPOST ROUTE WITH THE PARAM OF /:ID FOR A SPECIFIC POST, THE ROUTER WILL USE THE POSTCONTROLLER WILL USE DELETEPOST FUNCTION

module.exports = router;
