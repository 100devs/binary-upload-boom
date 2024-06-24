module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};


/*
    module.exports:
        In Node.js, module.exports is an object that is used to define what should be exported from a module. When you require a module in another file, the value of module.exports becomes accessible in the importing file.

    getIndex:

        getIndex is a property of the exported object. It is a route handler function that is intended to handle HTTP requests to a specific route in your Express.js application.

        The (req, res) parameters represent the request and response objects. These are typically provided by Express.js for handling incoming HTTP requests and sending responses.

    res.render("index.ejs");:

        Inside the getIndex function, res.render() is used to render an "index.ejs" view and send it as a response to the client.

        The "index.ejs" view is likely an EJS (Embedded JavaScript) template that will be rendered with dynamic data and returned as an HTML response to the client.

In summary, this module exports a single route handler function named getIndex, which renders an "index.ejs" view when the corresponding route is accessed. This is a common pattern in Express.js applications for rendering HTML views based on user requests.
*/