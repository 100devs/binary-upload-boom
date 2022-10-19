const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Favorite = require("../models/Favorite");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      res.render("profile.ejs", { recipes: recipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      // const favorites = await Favorites.find({ user: req.user.id });
      const recipe = await Favorite.find({ user: req.user.id }).populate('recipe');
      console.log(Favorite);
      res.render("favorites.ejs", { recipes: recipe, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Recipe.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    // get individual post
    try {
      const recipes = await Recipe.findById(req.params.id);
      res.render("recipe.ejs", { recipe: recipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Recipe.create({
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        indgredients: req.body.ingredients,
        directions: req.body.directions,
        likes: 0,
        user: req.user.id,
      });
      console.log("Recipe has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  favoriteRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Favorite.create({
        user: req.user.id,
        recipe: req.params.id,
       
      });
      console.log("Favorite has been added!");
      res.redirect(`/recipe/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeRecipe: async (req, res) => {
    try {
      await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/recipe/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRecipe: async (req, res) => {
    try {
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Recipe");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
