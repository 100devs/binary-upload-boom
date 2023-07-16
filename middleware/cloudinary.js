// import cloudinary for picture hosting management
const cloudinary = require("cloudinary").v2;
// require config from dotenv to connect to cloudinary
require("dotenv").config({ path: "./config/.env" });
// config of the cloudinary middleware and export it for use
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
