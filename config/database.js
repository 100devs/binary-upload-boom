const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING)

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
