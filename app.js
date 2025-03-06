const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

//create instance of an app
const app = express();

const dbURL = 'mongodb+srv://bloguser:blog123@cluster0.hcyoj.mongodb.net/nodejs-blog?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURL)
    .then((result)=> app.listen(3000))
    .catch((err)=>console.log(err));

// blogs
// const blogs = [
//     {
//         title: 'My Travel to Nepal',
//         description: 'Nepal is a beautiful country with stunning views and nature.'
//     },
//     {
//         title: 'My Experience of skydiving.',
//         description: 'Skydiving was an awesome activity for me to experience.'
//     },
//     {
//         title: 'Countries I wish to visit',
//         description: 'I wish to visit many countries like Japan and Czech Republic.'
//     },
//     {
//         title: 'A Day in the Life of a Software Developer',
//         description: 'Being a software developer involves solving problems and writing code.'
//     }
// ];

app.use(express.static('public'));

app.use(morgan('dev'));

app.set('view engine','ejs');

//all get requests
app.get('/',(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('home',{blogs:result,title:'Home'})
        })
        .catch(err=>{
            console.log(err);
        })
});

app.get('/blog-add',(req,res)=>{
    const blog = new Blog({
        title: 'A Day in the Life of a Software Developer',
        description: 'Being a software developer involves solving problems and writing code.',
        content: 'A typical day in the life of a software developer starts with checking emails and messages for any updates or issues. This is followed by a stand-up meeting with the team to discuss progress and plans for the day. The rest of the day is spent writing code, debugging, and collaborating with team members to solve problems. In between, there might be code reviews, design discussions, and learning new technologies. The day ends with a sense of accomplishment and a list of tasks for the next day.'
    });
    blog.save()
        .then((result)=>{res.send(result);})
        .catch((err)=>{console.log(err)})
});

app.get('/home',(req,res)=>{
    res.redirect('/');
})

app.get('/index',(req,res)=>{
    res.redirect('/');
})

app.get('/about',(req,res)=>{
    res.render('aboutus',{title:'About US'});
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

app.use((req,res)=>{
    res.status(404).render('404',{title:'Not Found Error'});
})