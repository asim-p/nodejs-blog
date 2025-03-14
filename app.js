const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

//create instance of an app
const app = express();

const dbURL = 'mongodb+srv://bloguser:blog123@cluster0.hcyoj.mongodb.net/nodejs-blog?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURL)
    .then((result)=> app.listen(8000))
    .catch((err)=>console.log(err));

//middleware
app.use(express.static('public'));
app.use(morgan('dev'));

//convert form data into usable format
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');

//all get requests
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('home',{blogs:result,title:'Home'})
        })
        .catch(err=>{
            console.log(err);
        })
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
            res.render('detail',{title:result.title,blog:result})
        })
        .catch(err=>{
            console.log(err);
        })
})

app.get('/home',(req,res)=>{
    res.redirect('/blogs');
})

app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

app.get('/index',(req,res)=>{
    res.redirect('/');
})

app.get('/about',(req,res)=>{
    res.render('aboutus',{title:'About US'});
})

app.post('/',(req,res)=>{
    newBlog = new Blog(req.body);
    newBlog.save();
    res.redirect('/');
})

app.get('/aboutus',(req,res)=>{
    res.redirect('/about');
})

app.get('/create',(req,res)=>{
    res.render('create',{title:'Create a Blog'})
})

app.get('/createblog',(req,res)=>{
    res.redirect('/create');
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect:'/blogs'})
        })
        .catch(err => {console.log(err)});
})

app.use((req,res)=>{
    res.status(404).render('404',{title:'Not Found Error'});
})