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

---

# Steps taken to add Comments

- Added Comments.js model, copied posts.js model and removed unnece$$ary stuff and linked post id to comment
- createComment route + added route to server.js (line 13 and 60)
- create comments.js controller we required the comments model, created method createComment method
- posts.ejs view added form for adding the comments under each posts line 27-41ish. form action post with route and dynamic post id

# Steps taken to add delete of comments
- update comment model to include userId
- in comments.js controller added user id to the CreateComment method and also the deleteComment method
- in posts EJS we added a deleteComment form with a garbage can icon and only showed this to users whom created the comment
  - added required attribute to comment input in form

# Add Comments
1. Add a Comments.js file to the models folder. 
    Schema needs comment, post id, and created at date.
2. Add comments.js file to routes folder.
    Route to create a comment.
3. Add comment routes to server.js file 
4. Add a comments.js file to the controllers folder.
    Require Comment model
    Create function to add a comment.
5. In posts.js file, in controllers folder, require Comment model and 
  add comments to getPost method
6. In posts.ejs file, in views folder, add a form for adding comments 
  and list for displaying them.

# Delete Comments
1. Add user id to the Comment Schema
2. In comments.js file, in controllers folder, add user id to the create 
  comment function. Then create a delete comment function.
3. In posts.ejs file, in views folder, add a delete method form and a 
  button with trash icon that is only displayed for user's that created 
  the comment.