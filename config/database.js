const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING)
    //console.log(`MongoDB Connected: ${conn.connection.host}`)
      //useNewUrlParser: true, //deprecated next version
      //useUnifiedTopology: true, //depreceated next version
      //useFindAndModify: false, //outdated
      //useCreateIndex: true,    //outdated
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
