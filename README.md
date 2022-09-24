# Latest Social Network

A project to practice handling file uploads, user authentication, and styling with Tailwind.

> Not all social networks are built the same. This one is. Or not. Kind of. You should try it just to see if I'm lying.




## Table of Contents
## Links

- [Submit a bug/issue](https://github.com/raissa-k/latest-social-network/issues)
- [User flow (in Wiki)](https://github.com/raissa-k/latest-social-network/wiki/User-flow)
## Demo

**Website**: [Latest Social Network](https://latest-social-network.onrender.com)

Note that the website is hosted on Render and may take a while to load if it has been inactive for a while.
```
To avoid signing up, you may log in with the following credentials:
- Email: tester3@gmail.com
- Password: testtest
```
## Screenshots

### Home Page (light mode)
![Home Page (light mode)](https://i.imgur.com/2JqhYmXl.png)

### Picture feed (smaller screen, dark mode)
![Picture feed (smaller screen, dark mode)](https://i.imgur.com/O97EDx5l.png)

### Post (light mode)
![Post (light mode)](https://i.imgur.com/E8DHAtul.png)

### User profile (light mode)
![User profile (light mode)](https://i.imgur.com/HWo0Wlll.png)
## Tech Stack

**Client:** JavaScript, EJS, Tailwind CSS

**Server:** Node, Express, MongoDB

**Dependencies:** 
```js
"dependencies": {
    "@tailwindcss/typography": "github:tailwindcss/typography",
    "apicache": "^1.6.3",
    "autoprefixer": "^10.4.11",
    "bcrypt": "^5.0.1",
    "cloudinary": "^1.25.1",
    "connect-mongo": "^3.2.0",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "express-flash": "^0.0.2",
    "express-session": "^1.17.1",
    "method-override": "^3.0.0",
    "mongodb": "^3.6.5",
    "mongoose": "^5.12.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "node-fetch": "^2.6.7",
    "nodemon": "^2.0.7",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "postcss": "^8.4.16",
    "postcss-cli": "^10.0.0",
    "tailwindcss": "^3.1.8",
    "unsplash-js": "^7.0.15",
    "validator": "^13.6.0"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.3",
    "cssnano": "^5.1.13"
  }
```
## Features

- Secure login with Passport Auth
- Updating user information
- Cache for external API calls to Unsplash
- Uploads to Cloudinary, with different sizes for post and profile pictures
- Prompts user before deleting a post
- Prompts and mobile menu are contained in accessible modals
- Responsive for desktop & mobile
- Light and dark mode toggle


## Run Locally

Clone the project

```bash
  git clone https://github.com/raissa-k/latest-social-network.git
```

Go to the project directory

```bash
  cd latest-social-network
```

Install dependencies

```bash
  npm install
```

Start the server

  a) With nodemon

```bash
  npm run dev
```

  b) With node

```bash
  npm run start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in `/config/.env`

A `.env.example` file is supplied inside the `config` folder.

```bash
DB_STRING= (MongoDB)
PORT= (any of your choosing)
CLOUD_NAME= (from Cloudinary Programmable Media)
API_KEY= (from Cloudinary Programmable Media)
API_SECRET= (from Cloudinary Programmable Media)
UNSPLASH_CLIENT_ID= (from Unsplash Image API)
```

## Roadmap

- [ ]  Add other authentication methods
- [ ]  Enable password change and recovery
- [ ]  Add public and private user pictures
- [ ]  Add share option
- [x]  Clean and minimize .css files
- [ ]  Clean and minimize and .js files
- [ ]  Add tests
## Lessons Learned

- Thorough planning and design must be done before implementing changes or new features.
  * Example: when a Comment model is created with Mongoose without a reference to the poster's profile picture, for instance, even when that is added to future versions it still means previous comments will not have a picture attached automatically to them.
- When possible, the use of semantic HTML5 rather than customized solutions, i.e. <details> rather than a fully custom accordion, can solve a lot of accessibility issues.
- Tailwind is a tool that makes implementing designs a lot faster, even if the HTML ends up looking very polluted with classes. Customizing colors and themes is fun!
## Authors

- [@raissa-k](https://www.github.com/raissa-k)


## Acknowledgements

 - Design inspired by [TailwindUI](https://tailwindui.com/) React templates.