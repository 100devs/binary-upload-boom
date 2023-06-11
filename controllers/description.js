const Description = require("../models/description");

module.exports = {
  createDescription: async (req, res) => {
    try {
        await Description.create({
        description: req.body.description, 
        post: req.params.id,
      });
      console.log("Description has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
 
};
