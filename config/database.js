//import mongoose
const mongoose = require("mongoose");

// create an async function to connect to the database
const connectDB = async () => {
  try {
    //wait for mongoose to connect with connection string
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

//exports the function to connect to DB
module.exports = connectDB;
