# About this Project
This is a full-stack project for a simple Instagram/social media clone.

The lectures about it start on [class 52](https://www.youtube.com/watch?v=z5UgtXOxEEk&list=PLBf-QcbaigsJysJ-KFZvLGJvvW-3sfk1S&index=45) and complete on [class 55](https://www.youtube.com/watch?v=xsKGlEemTAo&list=PLBf-QcbaigsJysJ-KFZvLGJvvW-3sfk1S&index=46).

This is an overview diagram of the functionality the application must have:
<img width="796" alt="image" src="https://github.com/user-attachments/assets/09c1a6d1-ca54-4fa7-9b9c-00eddfd441f3">

# Getting Started
#### 1. Fork this repository
You can find the Fork button in the top right of the screen (between "Watch" and "Star").

Check the box to copy only the main branch.
  
#### 2. Clone your fork
On the page of your forked repository, click on the "Code" button. Then, follow the instructions in the local tab for your desired authentication method.

For HTTPS and SSH, you will need to use the `git clone` command with the copied URL in the terminal. 
   
# Running the Application
#### 1. Install project dependencies
In a terminal, navigate to the directory with your local copy of the repository. Then, run the command `npm install`.

#### 2. Create the collections in MongoDB
You should already have a MONGODB database set up from previous classes by now. You will need to set up one (or more) of the following collections: Users, Posts, Comments. 

Please refer to the diagram above to understand the requirements for each collection. The recorded videos for the lectures may also be helpful to follow along. 

Once you have that done, get your database URI. 
   
#### 3. Create your .env file
Navigate to the `config` directory and create a `.env` file.

Add the following as `key = value` (Important - do not change the keys!):
   
     PORT = 2121 // can be any port, for example, 3000
     DB_STRING = `your database URI`
     CLOUD_NAME = `your cloudinary cloud name`
     API_KEY = `your cloudinary api key`
     API_SECRET = `your cloudinary api secret`
   
#### 3. Run the application
In a terminal (and inside the root directory of the project), run the command `npm start`.

To access the app and see the user interface, visit http://localhost:212 in a browser. Note that `2121` in the url should be replaced if you used a different port number for the `PORT` key in your `.env`.

# The Assignment
Before anything, you should ensure your database is setup correctly with the required collections in MongoDB (including users and posts), as described in the previous section. The application will break without it! 

Your main job for this assignment is to add a `Comment feature`! Users should be able to *view* all the comments, *write* a comment, and *delete* a comment for a post.

For bonus practice, you can also try adding functionality to allow users to like/dislike a comment. 

Submit your work by opening a Pull Request with your changes to the main repository. 

# What's Next and Where to Get Help
Next, you will work on the 100-hour MVP project. At this point, you should know everything you need!

This project is a good example/starting point if you need one. You can add many more features to it, make it look nicer, or use it as a guideline to build your own application.

Please watch the videos for [class 56/57](https://www.youtube.com/watch?v=zjxo_-wNZHE&list=PLBf-QcbaigsJysJ-KFZvLGJvvW-3sfk1S&index=50&t=70s) for more information. 

Join the [100Devs Discord community](https://leonnoel.com/discord) for questions/updates. If you are part of the #CatchUpCrew, you can find other students to team up with for the MVP project there! 
