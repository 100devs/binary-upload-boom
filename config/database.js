const mongoose = require("mongoose"); // this is the schema for Mongo DB

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {  //it tries to use the var DB_STRING set up on .env to connect to mongodb and checks that these patterns are set up properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); //if mongodb is not connected, then catch the error
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
