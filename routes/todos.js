const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

/*router.get('/:id', ensureAuth, todosController.getTodos)*/ //get done by post router, as todos are a nested component of posts

router.post('/createTodo/:id', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo/:postid/:todoid', todosController.deleteTodo)

module.exports = router