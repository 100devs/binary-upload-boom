const Contact = require("../models/Contact");
const Comment = require("../models/Comment");
const Directory = require("../models/Directory");
const Doctor = require("../models/Doctor");
const Med = require("../models/Med");


module.exports = {
    getContact: async (req,res)=>{
        console.log(req.user)
        try{
            const contacts = await Contact.find({userId:req.user.id})
            const comments = await Comment.find({med: req.params.id}).sort({ createdAt: "desc" }).lean();
            // const  = await Todo.countDocuments({userId:req.user.id,completed: false})itemsLeft
        res.render('contact.ejs', {contacts: contacts, user: req.user, comments: comments})
        }catch(err){
            console.log(err)
        }
    },
    getDirectory: async (req, res) => {
        try {
          const med = await Med.findById({med: req.params.id});
          const contacts = await Contact.find().sort({ createdAt: "desc" }).lean();
          res.render("directory.ejs", { contacts: contacts });
        } catch (err) {
          console.log(err);
        }
      },
      getMed: async (req, res) => {
        try {
          const med = await Med.findById(req.params.id);
          const comments = await Comment.find({med: req.params.id}).sort({ createdAt: "desc" }).lean();
          res.render("med.ejs", { med: med, user: req.user, comments: comments });
        } catch (err) {
          console.log(err);
        }
      },
    createContact: async (req, res)=>{
        try{
            const contact = await Contact.create({ 
               title: '',
               address: req.body.address,
               phone: req.body.phone,
               user: req.user.id,
            });

        console.log('A new contact has been added!')
        res.redirect('/contact')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deleteContact: async (req, res)=>{
        try{
      // Find contact by id
      let contacts = await Contact.findById({ _id: req.params.id });
      // Delete the contact from the db
            await Contact.remove({ _id: req.params.id });
            console.log('Deleted Contact!');
            res.json('Deleted Contact');
        res.redirect("/contact");
    }catch(err){
        res.redirect("/contact");
        }
    },
};    