// import cloudinary pkg
const cloudinary = require("cloudinary").v2;

// use dotenv to read values from .env file
require("dotenv").config({ path: "./config/.env" });

// configure cloudinary to use secrets from .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// export cloudinary to be used elsewhere in the application
module.exports = cloudinary;
