//imports v2 of cloudinary
const cloudinary = require("cloudinary").v2;

//configures dot env file
require("dotenv").config({ path: "./config/.env" });

//sets up cloudinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//exports our cloudinary access
module.exports = cloudinary;
