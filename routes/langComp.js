const express = require("express");
const router = express.Router();
const langCompController = require("../controllers/langComp");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
//fix this later i.e. perhaps changing the endpoint and double checking profile 10/31/2022

router.post("/createTable", langCompController.createTable);


module.exports = router;