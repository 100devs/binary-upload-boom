const mongoose = require("mongoose");

//connecting to the DataBase
const connectDB = async () => {
  try {
    //connect to the database using the connection string
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    //log the error if there are any
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
