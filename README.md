# Social App
Social app clone to wander through the MVC. Not the most original layout thus far and Bootstrapped, but will be trying some different things after functionality is in. Forked from 100devs.

Includes user authentication, post/comment attribution, unique likes, etc.

## Progress
Building on the OG codebase as follows.

---
**Unique likes per user** (although you can still like your own posts) + **Comments with attribution**

![unique_likes](https://user-images.githubusercontent.com/102257735/191158487-f0a942d3-9889-4070-aee0-a7b38bfd5ac2.jpg)

---
**Like posts from the feed**

![likes_from_feed](https://user-images.githubusercontent.com/102257735/191158522-98a35f24-3e4f-4a7d-bf07-a521637fe140.jpg)

**Done**
- Update multer config to accept GIFs.
- Post Likes are now unique users. _Approach:_
    - Need array in schema
    - when like is updated, check if user id is in array. If not, push user id into array and increment like. If yes, remove user id from array and decrement like.
- Format "user has liked" and "user has not liked" differently.
- Each comment has user attribution.
- Make it possible to like a post from the feed view: 
  - Troubleshooting: The same conditionals and even others that worked previously/elsewhere (getPost) was not working for getFeed. Turns out that .lean() was stripping out some aspect of the doc that was preventing matching logic. Once removed, the previous conditional worked.
  - Proceeding with the working logic (.includes), but leaving comments (postsController.getFeed) for future testing as the reasons for failure for those are still TBD.
- Make it possible to visit other users' profiles, which will not have add post options.
- Make it possible to like comments.
- Change 'like' back to SVGs.
- Link commenter names to their profile pages.
- Personalize the header with username greeting when logged in.

**On deck**
- Make it possible to sort posts in feed by recency, popularity (number of likes), personal favorites (liked by viewer), etc.
- Make it possible for commenter to delete their own comments.
- Make it visually acceptable (and consider deviating wildly from Instagram design).

**Stretch goals**
- Try a very different visual approach. Need to decide on mobile and desktop experience.
- Let users apply filters and format variations (skins/themes) to images in their entire feed (selective class).
- Clickable hashtags.
- Posts that can be bookmarked (although also could repurpose likes).
- Let users apply filters and edits to their image on upload (the more standard Instagram function). _Cloudinary functionality._
- Let users tag each other in posts and comments. Outcome: show comments and posts tagged to you in specific section of your profile. Same behavior for other users' profiles for their tags/mentions.

## Learnings
With each update, my workflow has generally been in Model => Controller => View order as well. 
- Keep test entries to a minimum since sometimes the schema has to change. 
- Remember that new doc creation also needs to have a default value (even if empty) for new fields. Otherwise, next queries result in errors. Mongoose/Mongo and EJS handles falsy a little strangely (if field does not exist in the doc, all rendering fails, rather than proceeding with assumed "false").
- PUT and DELETE reqs use method overrides to bypass the need for client-side JS complexity, but also removes the option of cautionary alerts from front end ("Are you sure you want to delete this post?").

Current methods iterate over the arrays and are inefficient - as evidenced by the delayed response to likes and redirections.
- [Fun commentary from back in 2013](http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/) that seems highly relevant...

For posterity: how to get the req.user part if you have a different front end setup (i.e., React rather than using EJS view engine) where you need to create the req body explicitly?
- Advice/response received: A common approach is for the frontend to make a request to the backend to get the currently logged in user information, then store that in react state. Fancier approaches include the backend telling the frontend which user is currently loggedin on initial request, or including such information in a cookie so the react app can get the current logged in user without making an additional request.

## Setup 
**Install**
`npm install`

**Things to add**
- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

**Run**
`npm start`
