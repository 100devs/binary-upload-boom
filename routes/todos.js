const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

/*router.get('/:id', ensureAuth, todosController.getTodos)*/

router.post('/createTodo/:id', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router