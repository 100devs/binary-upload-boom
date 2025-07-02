//modules needed at top level
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

//.env file for secrets
require("dotenv").config({ path: "./config/.env" });

//passport configuration
require("./config/passport")(passport);

//connect to mongoDB
connectDB();

//ejs for views
app.set("view engine", "ejs");

//static files 
app.use(express.static("public"));

//sending and receiving json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logger
app.use(logger("dev"));

//use forms for PUT and DELETE requests
app.use(methodOverride("_method"));

//session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//error messages
app.use(flash());

//receiving requests and allocating routers
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//start the server
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
