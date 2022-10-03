const Todo = require('../models/Todo')

module.exports = {
   /*getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('post.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },*/
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, 
                completed: false, 
                post: req.params.id})
            console.log('Todo has been added!')
            //changed redirect from todos page to post id
            res.redirect("/post/"+req.params.id);
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
   /* deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }*/
     deleteTodo: async (req, res) => {
        try {
          // Find post by id
          let todo = await Todo.findById({ _id: req.params.todoid });
            // Delete post from db
          res.redirect("/post/"+req.params.postid);
             } catch (err){
            console.log(err)
         }
    }
           
}    