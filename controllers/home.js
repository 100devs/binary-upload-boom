module.exports = {
  getIndex: (req, res) => {
    let user = ((typeof(req.user) !== 'undefined') ? req.user : { _id: '' })
    console.log(user)
    res.render("index.ejs", { user: user });
  },
};
