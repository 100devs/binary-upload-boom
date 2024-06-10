const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });
//telling cloudinary where to put our stuff user name giving it all out api keys
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
