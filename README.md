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

# Updates 

- Updated code to work with newest version of mongoose/node.js
- Added the ability for users to make comments that record the comment, the date the comment was made, and the user who made the comment
- Added a delete button for comments that will only show up for logged-in users on comments that they wrote
- Added title and username to images in the feed
- Added username to posts
- Changed the likes button so that you can only like each post once. It's also a toggle so if you click it again, you unlike the post. 
- Made the dates look a little nicer
- Cleaned up commented-out text

# To add in the future 

- edit button for comments
- edit button for caption, post title?
- add a like button to the feed page? 
- cloudinary & passport error messages can be seen by the user
