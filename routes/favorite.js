const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorite");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//comment 
//@route /favorite
router.get("/add", favoriteController.addFavorite);
router.get("/remove", favoriteController.removeFavorite);

module.exports = router;
