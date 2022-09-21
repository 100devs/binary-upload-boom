const Favorite = require("../models/Favorite");


module.exports = {
  addFavorite: async (req, res) => {
    console.log(`add favorite`)
    console.log(req)
    console.log(`user`, req.user)
        try {
            // Upload image to cloudinary
      
            
          } catch (err) {
            console.log(err);
          }
  },


  removeFavorite: async (req, res) => {
    console.log(req.body)
        try {
            // Upload image to cloudinary
      
            
          } catch (err) {
            console.log(err);
          }
    
  },
}
