const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Wishlist Routes - simplified for now
router.get("/:id", ensureAuth, wishlistController.getWishlist)  

router.post("/createWishlist/:id-:title-:caption-:cloudinaryId" , wishlistController.createWishlist);//////////////////////////////////////////added uploadsingle file for testing

router.delete("/deleteWishlist/:id", wishlistController.deleteWishlist);




module.exports = router;