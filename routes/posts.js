//USE EXPRESS TO MAKE NODEJS EASIER
const express = require("express");
//get a new router instance AND USE APP.USE LATER TO CALL THE ROUTER VAR
const router = express.Router();
//import the configuration in the multer.js located in the middleware folder. The multer allows you to upload images
const upload = require("../middleware/multer");
//import your postcontroller by going to controller and post file
const postsController = require("../controllers/posts");
//CONNECT ENSUREAUTH FROM FOLDER OF MIDDLEWARE AND FILE OF AUTH AND ITS USED TO MAKE SURE THE USE IS ALWAYS LOGGED IN. WE USE THE CURLY BRACKETS AS DESTRUCTORS BUT IT COULD BE CHANGED TO GUEST ACCTS OR OTHERS USERS.
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); ////IF THERES A GET REQUEST ON THE MAIN PAGE with the params of id of the post, THE ROUTER WILL USE THE ENSUREAUTH FUNC AND IF ITS APPROVED, THE POSTCONTROLLER WILL USE GETPOST FUNCTION

router.post("/createPost", upload.single("file"), postsController.createPost);
////IF THERES A POST REQUEST ON THE CreatePOST ROUTE, THE ROUTER WILL USE THE MULTER.JS FUNC TO UPLOAD A FILE  AND THE POSTCONTROLLER WILL USE CREATEPOST FUNCTION

router.put("/likePost/:id", postsController.likePost);
//IF THERES A PUT REQUEST ON THE LIKEpost ROUTE WITH THE PARAM OF /:ID FOR A SPECIFIC POST, THE ROUTER WILL USE THE POSTCONTROLLER WILL USE LIKEPOST FUNCTION

router.delete("/deletePost/:id", postsController.deletePost);
//IF THERES A DELETE REQUEST ON THE DELETEPOST ROUTE WITH THE PARAM OF /:ID FOR A SPECIFIC POST, THE ROUTER WILL USE THE POSTCONTROLLER WILL USE DELETEPOST FUNCTION
module.exports = router;
