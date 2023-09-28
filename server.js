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
/*
these are the various libraries and middleware you've imported at the beginning of your Node.js application. They provide essential functionality for building web applications, including database integration, authentication, session management, and more. Depending on the rest of your code, these libraries will likely be configured and used in specific ways to build your application's functionality.

1. importing the express module and creating an Express application instance named app. Express is a popular Node.js web application framework that simplifies building web applications by providing various tools and middleware.

2. The line imports the mongoose library. Mongoose is an Object Data Modeling (ODM) library for MongoDB, which allows you to interact with MongoDB databases using JavaScript objects. In the code snippet you've provided, there's no database connection established yet, but it suggests that this application will likely connect to a MongoDB database using Mongoose.

3. Authentication with Passport.js Passport.js is a popular authentication middleware for Node.js applications. It's used for implementing user authentication strategies. In this code, you've imported the passport library, indicating that you'll be using it for authentication in your application.

4. Session Management with express-session: The express-session library is used for session management in Express applications. Sessions allow you to store data related to a user's interaction with your application across multiple requests. This is essential for features like user authentication and maintaining user sessions.

5.Session Storage with connect-mongo: This line imports MongoStore, which is a session store for express-session. It's used to store session data in MongoDB. Sessions need to be stored somewhere, and MongoStore provides a way to do this in a MongoDB database.

6. Method Override Middleware: The method-override middleware allows you to use HTTP methods like PUT and DELETE in forms, as HTML forms typically only support GET and POST requests. It allows you to override the HTTP method used in a request, which can be helpful for RESTful APIs

7. Flash Messages Middleware: The express-flash library is used for flashing messages to the user. Flash messages are typically used to display temporary messages to the user after an action (e.g., a successful login or an error message).

8. Logging Middleware with Morgan: morgan is a middleware used for logging HTTP requests. It's useful for debugging and monitoring the incoming requests to your application

  THE ROUTING
  const mainRoutes = require("./routes/main");
  const postRoutes = require("./routes/posts");
  
  1. mainRoutes: importing a module located in the ./routes/main.js file. This module likely contains a set of route definitions using the Express.js framework. These routes are responsible for handling various HTTP requests and defining the behavior of your application for different URLs.
  2. postRoutes: importing another module located in the ./routes/posts.js file. This module probably contains route definitions specific to posts or blog-like content. Again, these routes will define how your application handles HTTP requests related to posts, such as creating, reading, updating, or deleting posts.
*/


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
/*
Loading Environment Variables:
    The dotenv library, when configured in this way, will read the .env file specified in the path and load its content into the Node.js environment. Each line in the .env file typically represents an environment variable in the format KEY=VALUE. For example:

DB_USERNAME=myusername
DB_PASSWORD=mypassword
SECRET_KEY=secretvalue
*/

// Passport config
require("./config/passport")(passport);
/*
the passport object is being passed to the function defined in the ./config/passport.js module. This is a common pattern in Node.js for configuring and initializing libraries like Passport.js for authentication.
*/

//Connect To Database
connectDB();
/*
code connectDB(); appears to be invoking a function named connectDB(). This function is likely responsible for establishing a connection to a database, given its name. However, the actual implementation of the connectDB
*/

//Using EJS for views
app.set("view engine", "ejs");
/*
The line of code app.set("view engine", "ejs"); in an Express.js application is used to configure the view engine that will be used to render dynamic HTML templates. Let's break down what this code does:

    app.set("view engine", "ejs");:

        app: This is the Express application instance you created earlier using const app = express();. It represents your web application.

        .set("view engine", "ejs"): This line of code is using the set method of the Express application to configure a setting. In this case, it's configuring the "view engine."

    View Engine:

        A "view engine" is a templating system that allows you to dynamically generate HTML pages by embedding dynamic data into templates. Express.js supports various view engines, and in this case, you're configuring it to use the "EJS" (Embedded JavaScript) view engine.
*/

//Static Folder
app.use(express.static("public"));
/*

The code you've provided configures Express.js to serve static files from a directory named "public." Let's break down what this code does:
express.static("public"):

    express.static() is a built-in middleware function in Express.js that serves static files, such as HTML, CSS, JavaScript, images, and other assets, directly to the client.

    In the code you've provided, you are telling Express to serve static files from a directory named "public." This means that any files placed in the "public" directory will be accessible to clients (browsers) when they make requests to your server.

Middleware Usage with app.use():

    app.use() is an Express.js method used to mount middleware functions in your application's request handling pipeline. Middleware functions can perform various tasks during the request-response cycle, such as authentication, logging, and, in this case, serving static files.

    By using app.use(express.static("public")), you are effectively adding the static file-serving functionality to your Express application. Any requests for files (e.g., "/styles.css" or "/images/logo.png") that match files in the "public" directory will be handled by this middleware and served to the client.

Static File URLs:

    When you serve static files using this middleware, the URLs for these files will be relative to the "public" directory. For example, if you have a file named "styles.css" in the "public" directory, it can be accessed by clients using the URL "/styles.css."
*/



//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
the code  provided configures Express.js to handle parsing of incoming request bodies. Express.js provides two middleware functions for this purpose: express.urlencoded() and express.json(). Let's break down what these lines of code do:

    express.urlencoded({ extended: true }):

        express.urlencoded() is middleware for parsing URL-encoded request bodies. URL-encoded data is commonly used when submitting HTML forms.

        { extended: true } is an option that enables the parsing of extended syntax with rich objects and arrays in the URL-encoded data. This option allows you to parse complex data structures within form submissions.

        By using app.use(express.urlencoded({ extended: true })), you are telling Express.js to parse incoming request bodies that are in URL-encoded format and make the parsed data available in the req.body object of your route handlers.

        For example, when a form is submitted via POST request with URL-encoded data, you can access the form fields in your route handler 
        xpress.json():

    express.json() is middleware for parsing JSON request bodies. This is useful when clients send data to your server in JSON format, which is common when working with APIs.

    By using app.use(express.json()), you are telling Express.js to parse incoming request bodies that are in JSON format and make the parsed JSON data available in the req.body object of your route handlers.

    For example, when a client sends a JSON payload in the request body, you can access it in your route handler

      By including both express.urlencoded({ extended: true }) and express.json() middleware, your Express.js application can handle a wide range of request body formats, including form submissions and JSON data, making it versatile for different types of client requests. These middleware functions ensure that the request data is properly parsed and available for processing in your route handlers.
*/


//Logging
app.use(logger("dev"));
/*

The code app.use(logger("dev")); is configuring and using the morgan middleware in your Express.js application. morgan is a popular logging middleware that provides detailed HTTP request logging. Let's break down what this code does:

    app.use(logger("dev"));:

        app.use(): This is an Express.js method for mounting middleware functions. Middleware functions are used to perform various tasks during the request-response cycle, such as logging, authentication, and more.

        logger("dev"): Here, you are calling the logger function and passing it the string argument "dev". This string argument specifies the logging format that morgan should use.

    Morgan Logging Formats:
        morgan supports various logging formats, and the "dev" format is one of them. It provides concise, colored, and human-readable logs that are helpful during development. The logs typically include information like the HTTP method, status code, response time, and request URL.

    Example Output:

    When a request is made to your Express application, morgan will log information about the request and the response in the console. Here's an example of what the log output 


    Purpose of Logging:

    Logging is essential for monitoring and debugging your application during development and production.
    It helps you track incoming requests, identify errors or issues, and measure response times.
    The "dev" format is particularly useful during development as it provides detailed information that can help you understand how your application is handling requests.

Custom Logging Formats:

You can also create custom log formats by passing a format string to morgan. For example, you can define a custom format like 
*/


//Use forms for put / delete
app.use(methodOverride("_method"));
/*
The code app.use(methodOverride("_method")); is configuring and using the method-override middleware in your Express.js application. This middleware is used to override the HTTP request method. Let's break down what this code does:

    app.use(methodOverride("_method"));:

        app.use(): This is an Express.js method for mounting middleware functions. Middleware functions are used to perform various tasks during the request-response cycle, such as method overriding, logging, authentication, and more.

        methodOverride("_method"): Here, you are calling the methodOverride function and passing it the string argument "_method". This string specifies the name of the query parameter that will be used to override the HTTP method in the request.

    Method Overriding:

        HTTP typically supports a limited set of request methods, such as GET, POST, PUT, DELETE, etc. However, in some cases, HTML forms can only send GET or POST requests. To work around this limitation and allow other HTTP methods like PUT and DELETE to be used in forms, the _method query parameter is often employed.

        When you include "_method" as a query parameter in a request, the method-override middleware looks for this parameter in the request and uses its value to override the HTTP method.

          In summary, app.use(methodOverride("_method")) configures the method-override middleware to allow HTTP method overriding by looking for the _method query parameter in incoming requests. This is a useful feature when working with forms that need to send HTTP methods other than GET or POST.


*/

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
/*
the code provided configures and uses the express-session middleware in your Express.js application to set up and manage sessions. Specifically, it configures sessions to be stored in a MongoDB database using the connect-mongo store. Let's break down what this code does:

    app.use(session({...})):

        app.use(): This is an Express.js method for mounting middleware functions. Middleware functions are used to perform various tasks during the request-response cycle, such as session management, authentication, and more.

        session({ ... }): This line of code is configuring the express-session middleware by passing an object with various options that define session behavior.

    Session Configuration Options:

    The object passed to session({ ... }) includes several configuration options:

        secret: A required option that specifies a secret used to sign the session cookie. This secret should be a long, random string and is used to secure the session data.

        resave: A boolean option that controls whether the session should be saved even if it wasn't modified during the request. Setting it to false can help reduce unnecessary session updates.

        saveUninitialized: A boolean option that controls whether a session should be saved for a new and unmodified session. Setting it to false can help avoid saving empty sessions.

        store: This option specifies the session store, which determines where session data is stored. In this code, it's using the MongoStore provided by the connect-mongo library. The mongooseConnection option tells MongoStore to use the Mongoose connection for storing and retrieving session data in the connected MongoDB database.

    Session Management and Storage:

        The express-session middleware manages user sessions by creating a session object that stores session-related data. This data can include user authentication information, shopping cart contents, and more.

        By specifying store: new MongoStore({ mongooseConnection: mongoose.connection }), you are configuring the session data to be stored in a MongoDB database. This is a common practice for web applications as it allows for session data persistence and scalability.

    MongoDB Connection:
        The mongoose.connection parameter is used to specify the connection to the MongoDB database that will be used for storing session data. Ensure that you have previously established a MongoDB connection using Mongoose in your application before configuring sessions in this way.

Overall, this code sets up session management in your Express.js application, making it possible to store and retrieve user-specific data across multiple requests. The session data will be securely stored in a MongoDB database, and the express-session middleware handles the session management aspects, such as creating, updating, and destroying sessions as needed.

*/






// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/*
The code you've provided configures and uses the Passport.js middleware in your Express.js application. Passport is a popular authentication middleware for Node.js applications. These two lines of code set up Passport and its session integration:

    app.use(passport.initialize()):

        app.use(): This is an Express.js method for mounting middleware functions.

        passport.initialize(): This line initializes Passport, making it available for use in your application. It's typically called as middleware near the beginning of your middleware stack.

        Passport provides various authentication strategies (e.g., local, OAuth, JWT) that you can configure and use to authenticate users. Calling passport.initialize() initializes Passport's core functionality and prepares it to authenticate requests.

    app.use(passport.session()):

        app.use(): Again, this is used to mount middleware functions.

        passport.session(): This line sets up Passport's session support. Passport can serialize and deserialize user instances to and from the session, allowing user authentication state to be preserved across requests.

        Passport stores user information in the session after successful authentication. When a user makes subsequent requests, Passport deserializes the user from the session and makes it available as req.user. This allows you to easily check if a user is authenticated and retrieve their information during the request/response cycle.

        To use passport.session(), you typically need to configure a few Passport-specific settings related to session serialization and deserialization. This is done by defining serialization and deserialization functions, often within a Passport strategy.

            serializeUser is used to determine what data from the user object should be stored in the session. The user.id is commonly used for this purpose.
    deserializeUser is used to fetch user data from the session and is typically responsible for retrieving the complete user object based on the ID stored during serialization.

These functions should be defined based on your application's user authentication strategy and the data you need to store in the session.
*/



//Use flash messages for errors, info, ect...
app.use(flash());
/*
the code app.use(flash()); configures and uses the "express-flash" middleware in your Express.js application. The "express-flash" middleware is used for displaying flash messages to users. Let's break down what this code does:

    app.use(flash()):

        app.use(): This is an Express.js method for mounting middleware functions.

        flash(): This line initializes the "express-flash" middleware and makes it available for use in your application. The "express-flash" middleware provides a way to store and retrieve flash messages, which are temporary messages that can be displayed to users typically after some action has occurred (e.g., a successful login or an error message).

    Flash Messages:
        Flash messages are often used in web applications to provide feedback to users about the outcome of a previous request or action. For example, you might use flash messages to display a "Successfully logged in" message after a user logs in, or to show an error message if there was a problem with a form submission.

    How Flash Messages Work:

        Flash messages are stored in the session, making them available for the next request. After they are displayed to the user, they are typically removed from the session so that they don't persist longer than necessary.

        To use flash messages, you typically set a flash message in one route handler and retrieve and display it in another route handler.

              Rendering Flash Messages:

        You typically render flash messages in your views (HTML templates) to display them to users. The specific way you render flash messages will depend on your application's front-end code and design.

        Flash messages are often rendered conditionally. If a flash message exists for a certain key (e.g., "success" or "error"), you can include HTML or text in your view to display it to the user.

In summary, app.use(flash()) sets up the "express-flash" middleware in your Express.js application, allowing you to store and retrieve flash messages that can be displayed to users to provide feedback or information about specific actions or events.

        */






//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

/*
app.use("/", mainRoutes);:

    This line specifies that the mainRoutes should be used for handling requests that match the root path ("/"). In other words, any request made to the root URL of your application, such as "http://example.com/", will be handled by the routes defined in the mainRoutes module.

    The mainRoutes module likely contains route handlers for the main pages or core functionality of your application, such as the homepage, about page, or general user interface.

app.use("/post", postRoutes);:

    This line specifies that the postRoutes should be used for handling requests that match the "/post" path. Any request made to a URL that starts with "/post", such as "http://example.com/post/create" or "http://example.com/post/123", will be handled by the routes defined in the postRoutes module.

    The postRoutes module is likely responsible for routes related to blog posts, articles, or any content that falls under the "/post" category in your application.

Route Modules:

    The mainRoutes and postRoutes modules are separate JavaScript files that contain route definitions and handlers. These modules define how your application should respond to specific HTTP requests, such as GET or POST requests, for the specified paths.

    Route modules often use Express.js functions like Router() to create a set of route handlers that are organized and can be easily imported into your main application file.
*/





//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
/*
    app.listen(process.env.PORT, () => {...});:

        app.listen(): This method is used to start the Express.js server and make it listen for incoming HTTP requests.

        process.env.PORT: The process.env object is used to access environment variables in your Node.js application. In this case, it's accessing the PORT environment variable, which is typically used to specify the port number on which the server should listen.

        By using process.env.PORT, you can dynamically assign the server's port number based on the environment in which your application is running. For example, you can use different ports for development, testing, and production environments.

        The second argument to app.listen() is a callback function that will be executed once the server has started and is listening for incoming requests.

    Server Startup Message:

        Inside the callback function, you are using console.log() to print a message to the console. This message is displayed once the server has successfully started. It's a common practice to include a message like this to indicate that the server is running and listening for incoming requests.

        The message "Server is running, you better catch it!" is a custom message you can change to suit your application's needs.

    Server Listening:

        When the app.listen() function is called, it starts the Express.js server, and it will keep running and listening for incoming HTTP requests until it is explicitly stopped or the Node.js process is terminated.

        The server will respond to incoming requests by executing the route handlers you've defined in your application.

In summary, this code snippet starts your Express.js server, and it listens on the port specified by the PORT environment variable. Once the server is up and running, it prints a message to the console to let you know that it's ready to handle incoming requests.
*/