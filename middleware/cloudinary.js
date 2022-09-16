const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
    cloud_name: 'deija',
    api_key: '551383875539282',
    api_secret: 'LCiG2QBsgCHRpe6V1w5tcB50VXU'
});

module.exports = cloudinary;