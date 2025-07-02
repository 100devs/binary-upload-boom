module.exports = {
  //main route, GET request
  getIndex: (req, res) => {
    //serve the base ejs file 
    res.render("index.ejs");
  },
};
