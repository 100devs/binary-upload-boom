# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`

### Planned Optimizations
Implement individual user profile views, not just the current user.
Migrate likes from a numeric type to a collection of users who liked the post itself, to which we can count and get the numeric representation that way, but also lets users of the web app see who liked their post.
Add a friend system
Restyle for a more robust UI.
Make it possible to add a post in the feed page.

### Knowledge gained from this project
Learned how to define new models, as well as routes and controllers for this model, upon existing ones, such as the comments model, and integrate into existing views. 
