const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const port = process.env.PORT;

// use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// passport config
require("./config/passport")(passport);

// connect to database
connectDB();

// using EJS for views
app.set("view engine", "ejs");

// static folder
app.use(express.static("public"));

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logging
app.use(logger("dev"));

// use forms for put/delete
app.use(methodOverride("_method"));

// setup sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use flash messages for errors, info, ect...
app.use(flash());

// setup routes for which the server is listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

// server running
app.listen(process.env.PORT, () => {
  console.log(`Server is running. Listening on port ${port}.`);
});