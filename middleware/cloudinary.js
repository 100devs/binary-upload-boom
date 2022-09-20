const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEYY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
