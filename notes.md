# Notes

## OG app
- GIF are not accepted media for upload?








auth
profiles
feeds
posts (delete,like)
comments


edits?
friends


## Schemas: if you need a new collection, you might need a new schema
User
- id (autogen by Mongo)
- userName
- email
- password
- bio: String?

- _friends_: array of other user IDs

Post
- id (autogen by Mongo) 
    - how we know which one to render. use it to make unique urls to grab the right post
- img: url/image (user provided)
- likes: Number (0 at creation)
- caption: String (user provided)
- userId:
- userName: String (created by)
- createdAt: date (generated)
- deleted: boolean (false on creationl we keep data and never delete! just not showing)




Comments - another collection?
- comment id
- content: string
- post ID associated w/ 
- userID: <-- to get username by >
- _likes for comment_: number
_can author delete it? can post owner hide it?_
*don't confuse user who wrote the post with user who wrote the comment


## post layout/card
view/post: http://localhost:2121/post/501 (post id is 501)

- img
- caption: String
- likes: Number 
- delete button (own user)
- _share option_
- _comments_
- _filter option for picture?_
- userName 


view/profile: localhost:2121/profile/100  (userid is 100)
- username
- all user's posts, deleted:false
- if user is same as logged in user, on their profile page, we can provide form for creating a post.
--- and prob include the delete button option per post
-----form:
- caption
- img (file upload)
- bio: string
_should they see all their past/most recent comments too?_



## storage
multer converts files into userful formats and store in cloudinary
cloudinary does many other types of media
send back url that can be used.

so rather than downloading to server, want to get images hosted on CDNs around the world instead to store img
