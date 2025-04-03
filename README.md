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

# Changes 4/3/25
  - **Updated packages**: Upgraded all dependencies to their latest versions for compatibility and improved functionality.
  - **Logout function**: Refactored the `logout` function in `auth.js` to include a callback for `req.logout` (required in Passport v0.6.0+). Ensured the session is properly destroyed using `req.session.destroy`, the session cookie is cleared with `res.clearCookie("connect.sid")`, and the user is redirected to the homepage (`/`).
  - **Deleting posts**: Replaced the deprecated `Post.remove` method with `Post.findByIdAndDelete` in `posts.js` for compatibility with Mongoose v7.x. Simplified `Post.findById` by removing unnecessary curly braces and `_id` to streamline the query.
  - **Comment creation**: Fixed the comment creation functionality by correcting the `res.redirect` URL in `comments.js` to include the missing `/` between `/post` and the post ID, ensuring proper redirection back to the post page.
  - **Passport.js refactor**: Refactored `passport.js` to replace callback-based Mongoose queries (e.g., `User.findOne`) with `async/await` for compatibility with Mongoose v7.x, which no longer supports callbacks. Improved error handling by wrapping queries in `try/catch` blocks for better reliability and debugging.


  - **Added a like button for comments**: 
  - Updated the `comments.js` route file to include a `PUT` route for liking comments (`/likeComment/:id`).
  - Added a `likeComment` method in the `commentsController` to increment the `likes` field in the `Comment` model using `findByIdAndUpdate`.
  - Updated the `post.ejs` file to include a like button for each comment, which sends a `PUT` request to the server using the `method-override` middleware.

  - **Added a delete button for comments**: 
  - Updated the `comments.js` route file to include a `DELETE` route for deleting comments (`/deleteComment/:id`).
  - Added a `deleteComment` method in the `commentsController` to find and delete a comment by its ID using `findById` and `deleteOne`.
  - Updated the `post.ejs` file to include a delete button for each comment, which sends a `DELETE` request to the server using the `method-override` middleware.
  - Ensured the `postId` is passed as a hidden input in the form to allow redirection back to the correct post page after deletion.
  
  - **Updated deleting comments when deleting posts**:
  - deleteMany() is a mongoDB method that is used to delete multiple documents from a collection that match a specified filter. This allows for easy removal of comments when getting rid of a post. 

  - Added some CSS to make comments nicer to look at.



