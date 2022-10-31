
const Bio = require("../models/Bio");

module.exports = {

    getBio: async (req, res) => {
        console.log(req.body)
        try {
          const bio = await Bio.find({ user: req.user.id });
          res.render("bio.ejs", { bio: bio, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
    
    createBio: async (req, res) => {
        console.log(req.body)
        try {
          
            await Bio.create({ 
              reading: req.body.currentRead, 
              project: req.body.currentProject,
              hobbies: req.body.hobbies,
              user: req.user.id,
              userName: req.user.userName,
              
            })
            console.log("Bio has been added")
            res.redirect(`/bio`)
        }
        catch (err) {
            console.log(err);
        }
      },


};

   

  

  
 
 
