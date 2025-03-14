const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');
const blogRedirects = require('./routes/redirects.js');

//create instance of an app
const app = express();

const dbURL = 'mongodb+srv://bloguser:blog123@cluster0.hcyoj.mongodb.net/nodejs-blog?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURL)
    .then((result)=> app.listen(8000))
    .catch((err)=>console.log(err));``

//middleware
app.use(express.static('public'));
app.use(morgan('dev'));

//convert form data into usable format
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');


//app blog
app.use('/blogs',blogRoutes);


//blog redirects
app.use(blogRedirects);


app.get('/about',(req,res)=>{
    res.render('aboutus',{title:'About US'});
})





app.get('/create',(req,res)=>{
    res.render('create',{title:'Create a Blog'})
})



app.use((req,res)=>{
    res.status(404).render('404',{title:'Not Found Error'});
})