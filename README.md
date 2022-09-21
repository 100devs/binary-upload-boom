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

pseudo
add a delete button to comments that will only be shown to loggedin user. 
only a logged user can delete their comment

TODO - create a route to handle the delete action
adjust the schema; you need the id of the person that created the comment
you need the username of the person that created the comment to show
you need a controller to handle the delete method; the controller is where the logic
happens. 
a view to show the delete button, the view will have a loop that will compare the 
id of the person that created the comment and the id of the logged in user before
showing the button
