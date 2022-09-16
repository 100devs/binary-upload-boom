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

# Updated
1. Displayed user names on post and link to their profiles
2. Change the profile view to only display the add post forum when on your own profile
3. Allowed comments to be added to posts, and comments have their own likes and deletes
4. Made it so that you cannot spam like a picture, just like or unlike it (change needs to be implemented on comments still)
5. Made user available everywhere in ejs with locals to link to the proper user page in the header
6. commented code line by line
