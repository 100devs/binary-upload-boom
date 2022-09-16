const mongoose = require("mongoose");

//Function to connect mongoose to mongodb to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING);
    // { depreciated
    //
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
