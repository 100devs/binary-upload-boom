// import mongoose to speak with mongoDB
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // connect to mongoDB using connection string from .env file
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // log err to console if thrown
    console.error(err);
    process.exit(1);
  }
};
// export func to be used elsewhere in the application
module.exports = connectDB;
