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
//########################################################### react added dependencies such as mongoose
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// this is the passport configuration file where we set up params
require("./config/passport")(passport);

//database configuration file. Pretty much how the data is being handled
connectDB();

//this is where we tell the app to use the templating language ejs
app.set("view engine", "ejs");

//what the name implies, using the static folder named public.
app.use(express.static("public"));

//Middleware that is bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//utilizing morgan for logging http request
app.use(logger("dev"));

//this lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// Uses forms for put / delete
app.use(methodOverride("_method"));

// session is used to to keep track of the user's state. Since we are using auth, we need to store this in a server or a DB
// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware. It is used for authentication
app.use(passport.initialize());
app.use(passport.session());

//This enables devs to display or render pop-up messages every time a user is redirected to a certain page. in this case it's being used for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
