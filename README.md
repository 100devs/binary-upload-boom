# Social App
Social app clone to wander through the MVC. Not the most original layout thus far and Bootstrapped, but will be trying some different things after functionality is in.

## Progress
Building on the OG codebase.

**DONE** Update multer config to accept GIFs.

**DONE** Post Likes are not scoped to unique user. (Comment likes tbd)
_Approach_
    - Need array in schema
    - when like is updated, check if user id is in array. If not, push user id into array and increment like. If yes, remove user id from array and decrement like.

**DONE** Format "user has liked" and "user has not liked" differently.

**DONE** Each comment has user attribution.

Make it possible to like a post from the feed view.

Make it possible to like comments.

Make it possible for commenter to delete their own comments.

Make it possible to respond to comments - possibly format differently.

## Setup 
**Install**

`npm install`

---

**Things to add**

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

**Run**

`npm start`
