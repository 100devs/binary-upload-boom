# 100Devs Binary Upload Boom Comments Project 

## by [@labrocadabro](https://github.com/labrocadabro) and [@Angra974]https://github.com/Angra974)

Modifications:

- Improved and responsive layout
	- header with nav menu
	- menu links show/hide based on logged in status
	- menu links highlight based on the current page
	- improved feed layout
	- improved profile layout
	- display homepage content based on user's logged in status
- added comments
- comments can be edited
- added post drafts that can be edited or deleted before publishing 
- post and comment creation/editing uses modal windows
- posts and comments can only be liked once by each user
- clicking like button a second time will unlike the post/comment





---



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
  - SESSION_SECRET = `your session secret code`

---

# Run

`npm start`
