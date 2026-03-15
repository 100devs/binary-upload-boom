const cloudinary = require("cloudinary").v2;

//gets the connection path for the cloudinary
require("dotenv").config({ path: "./config/.env" });

//configures connection to the cloudinary based on the inputs from the env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
