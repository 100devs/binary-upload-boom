const cloudinary = require("cloudinary").v2;

//giving access to loggin to cloudinary
require("dotenv").config({ path: "./config/.env" });

//access to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//exports cloudinary 
module.exports = cloudinary;
