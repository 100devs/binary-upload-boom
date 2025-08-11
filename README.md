# Product-Pulse

Product Pulse simplifies the customer feedback process. Obtaining and organizing customer feedback regarding a company's products is a time consuming process. Every customer has their own version of what they would like to see improved. This was a pain point during my time as a Software Support Specialist. 

A company can create products to be listed under their company. Customers can leave reviews, like other customers' reviews and rate the products from 1-5.

https://github.com/user-attachments/assets/031f095e-4cec-43e8-8012-a6f6aabcc0cd

**Link to project:** [https://product-pulse.onrender.com/](https://product-pulse.onrender.com)

## How It's Made:

**Tech used:** HTML, CSS, Bootstrap, JavaScript, EJS, Node, Express, MongoDB

## Optimizations

Multiple images for each product.
Allow companies and users to upload videos.
Allow reviews to be replied to.

## Lessons Learned:

The need for thinking out the database and data structure. Intiatlly I did not include all the IDs linking the products to ratings and comments and comment likes.


To run the app locally:
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
