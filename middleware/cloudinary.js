const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });
//Require ENV

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// Pulls everything from ENV file to use cloudinary.

module.exports = cloudinary;
