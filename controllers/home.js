module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getHome: async (req, res) => {
    try {
      // let mongoose = require('mongoose')
      // const contacts = await Contact.find({ userId: req.user.id });
      // console.log(req.body)

      
      res.render("welcome.ejs");
    } catch (err) {
      console.log(err); 
    }
  },
};
