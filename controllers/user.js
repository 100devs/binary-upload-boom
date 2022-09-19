const Post = require("../models/Post");
const User = require('../models/User');

module.exports = {
    getProfile: async (req, res) => { 
      try {
       // const posts = await Post.find({ user: req.user.id });
        const users = await User.findById(req.params.id)
        const url = await req.originalUrl;
        res.render("profile.ejs", { /* posts: posts,  */user: req.user, users: users, url: url }); 
            console.log(users)
      } catch (err) {
        console.log(err);
      }
    },
    updateUser: async (req, res) => {
        try {

            /* const filter = { userName: 'bob' }; */
            /* const filter = {
                "_id": req.params.id,
                "leagues.leagueName": req.params.id
              };

            const update = {
                $push: {
                    "leagues.$[league].leagueName": 'seahawks'
                }
            };
            const arrayFilter = {
                arrayFilters: [
                    {
                        'leagues.leagueName': leagueNameId
                    }
                ]
            }; */

            const url = await req.originalUrl;
            /* console.log(req.user.id , 5)
            console.log(req.params.id, 100) */
            const users = await User.findOneAndUpdate(filter, update, arrayFilter, {
            new: true
        });
        
          console.log("CHANGED USER");
          res.redirect(`/profile/{${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
      },
    deleteSomething: async (req, res) => {
        try {
          
          // Find post by id
          //let post = await Post.findById({ _id: req.params.id });
          const users = await User.find({ user: req.user.id })

          // Delete post from db
          await User.remove({ user: req.params });

          console.log("Deleted something");
          res.redirect(`/profile/{${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
      }
}