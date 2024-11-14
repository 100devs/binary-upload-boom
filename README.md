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

# Elements Added
- Added input field to posts.ejs
- Work that will likely need to be redone
    - Added comments to the new post schema
    - Added an addComments route and controller (This is ok for the moment but will likely need to be update in the future)

Verified that the above works as expected, but will need to create a comments collection for all the new comments. 
