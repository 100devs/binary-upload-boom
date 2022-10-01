
# Pictogram

A full-stack photo-sharing social media app that enables users to post photos & comment on posts.

**Link to project:** https://pictogram.cyclic.app

## Screenshots

![pictogram](https://user-images.githubusercontent.com/101529105/193375716-6619770d-a471-49d4-b07c-b5d558ab4d22.png)



## Tech Stack

**Client:** JavaScript, EJS, TailwindCSS

**Server:** Node, Express, MongoDB

**Dependencies:** bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

## Features

- Secure login with Passport Auth
- Upload photo posts with title and caption
- See other users posts in the photo feed
- Like and comment on other posts


## Installation

Install with npm

```bash
  npm install bcrypt connect-mongo dotenv ejs express express-flash express-session mongodb mongoose morgan nodemon passport passport-local validator
```
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`PORT = <port>` (can be any port, ex: 3000)

### Database

`DB_STRING = <your MongoDB uri>`
## Optimizations

- Added collapsable nested comments

**Planned Features & Improvements:**

- Make posts shareable
- Create friends list

## Other Examples of My Work

**Mailroom:** https://mailroom.cyclic.app

**Pictogram:** https://pictogram.cyclic.app

**myPetPal: ** https://mypetpal.onrender.com
