const User = require('../models/User')

exports.getUserNav = (req,user) => {

   const currentUser = User.findOne({user: req.user}) 
   console.log(currentUser)

}