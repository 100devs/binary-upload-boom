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

# Update

- Users can now comment on their post and posts created by others
- User comments include their username and comment content
- Now that the user.id is stored in an array inside the database, users can like a post only once, and unlike a post. 
- User can like a comment(multiple times allowed) and delete a comment if the username is a match 
