const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const upload = require("../middleware/multer");/////////////////////////////////////////////////////added this to test out 

//Wishlist Routes - simplified for now
router.get("/:id", ensureAuth, wishlistController.getWishlist)  

router.post("/createWishlist/:id",upload.single("file"), wishlistController.createWishlist);//////////////////////////////////////////added uploadsingle file for testing






module.exports = router;