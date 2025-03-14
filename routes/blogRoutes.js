const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/',(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('home',{blogs:result,title:'Home'})
        })
        .catch(err=>{
            console.log(err);
        })
});

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
            res.render('detail',{title:result.title,blog:result})
        })
        .catch(err=>{
            console.log(err);
        })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({redirect:'/blogs'});
        })
        .catch(err => {console.log(err)});
});

router.post('/',(req,res)=>{
    newBlog = new Blog(req.body);
    newBlog.save();
    res.redirect('/');
})

module.exports=router;