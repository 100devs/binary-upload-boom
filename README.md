# Binary Upload Boom
A full-stack social media application where users can share images, create posts, and interact through comments. Built as part of the 100Devs bootcamp curriculum, demonstrating modern web development practices with Node.js and MongoDB.

![Binary Upload Boom Screenshot](./public/imgs/app-screenshot.png)

Link to project: https://binary-upload-boom-d56c.onrender.com

## How It's Made:
**Tech used:** Node.js, Express.js, MongoDB, Mongoose, Passport.js, EJS, Cloudinary, Multer, CSS3

This application was built using an MVC architecture with Node.js and Express.js for the backend server. Authentication is handled through Passport.js with local strategy for secure user registration and login. Session management uses express-session with MongoDB storage for persistent user sessions.

The database layer uses MongoDB with Mongoose ODM for data modeling. User, Post, and Comment schemas handle all data relationships, with proper user association to prevent unauthorized access. Password security is implemented using bcrypt for hashing.

Image upload functionality is powered by Cloudinary integration with Multer middleware for file handling. Users can upload images which are stored securely in the cloud and displayed in their posts. The frontend uses EJS templating for server-side rendering with dynamic content.

The application features a complete social media experience with user profiles, image posts, commenting system, and responsive design that works across all devices.

## Optimizations
Implemented proper MongoDB indexing on user fields for fast query performance. Used bcrypt with automatic salt generation for secure password storage. Session management includes proper secret configuration and MongoDB session persistence.

Cloudinary integration optimizes image storage and delivery with automatic compression and formatting. Multer middleware includes file validation and size limits for security. EJS templating provides efficient server-side rendering with reusable partials.

Implemented comprehensive error handling with try-catch blocks and user-friendly flash messages. Route protection middleware ensures users can only access their own data and authenticated routes.

## Lessons Learned:
**Full-Stack Architecture** - Building this social media app taught me the importance of proper MVC separation and how each layer should have distinct responsibilities. The clear separation between models, views, and controllers made the codebase maintainable and scalable.

**Authentication & Security** - Working with Passport.js provided deep understanding of session-based authentication, password hashing, and route protection. Learning how to properly secure user data and implement authorization was crucial for building production-ready applications.

**File Upload Systems** - Implementing image upload with Cloudinary and Multer taught me about file handling, cloud storage integration, and security considerations for user-generated content. Understanding how to validate and process files safely was essential.

**Database Relationships** - Designing schemas for users, posts, and comments demonstrated how to structure relational data in MongoDB. Learning to properly associate data between different collections was fundamental for building complex applications.

## Future Improvements
Add image compression before upload to reduce file sizes. Implement basic email notifications for new followers or comments on posts.

Add the ability to edit posts after they're created. Include a search function to find specific posts or users. Add password reset functionality for users who forget their login credentials.

## Examples of Other Work
- **[Portfolio Website](https://github.com/JackGer26/portfolio)** - Modern React portfolio showcasing all projects
- **[100Jobs React Board](https://github.com/JackGer26/100Jobs)** - React SPA with full CRUD functionality
- **[Green Cars Airport Transfers](https://github.com/JackGer26/Green-Cars-Airport-Transfers)** - Professional business website with Email.js integration