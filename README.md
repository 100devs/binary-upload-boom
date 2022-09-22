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
- A way to input a comment
- a model to create the comment
    **model will need...**
        - comment
        - user who posted it
        - post where it is being commented
        - date created
- a route to add and delete comments
- a controller to handle the adding and deleting of comments
- change post rendering to include comments