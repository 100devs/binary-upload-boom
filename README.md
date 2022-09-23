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

# Steps taken to add Comments

- Added Comments.js model, copied posts.js model and removed unnece$$ary stuff and linked post id to comment
- createComment route + added route to server.js (line 13 and 60)
- create comments.js controller we required the comments model, created method createComment method
- posts.ejs view added form for adding the comments under each posts line 27-41ish. form action post with route and dynamic post id

# Steps taken to add delete of comments
- update comment model to include userId
- in comments.js controller added user id to the CreateComment method and also the deleteComment method
- in posts EJS we added a deleteComment form with a garbage can icon and only showed this to users whom created the comment
- added required attri
