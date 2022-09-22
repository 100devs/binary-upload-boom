const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createInventoryItem/:id",  inventoryController.createInventoryItem);

module.exports = router;
