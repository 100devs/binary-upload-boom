const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

// Cloduinary middle ware to configure to codinary
//does not need to be in config because we are using it as middleware  
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
