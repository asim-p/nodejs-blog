const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');
const blogRedirects = require('./routes/redirects.js');
require('dotenv').config();

const port = process.env.PORT;
const dbURL = process.env.DB_URL;

//create instance of an app
const app = express();


mongoose.connect(dbURL)
    .then((result)=> app.listen(port))
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




app.use((req,res)=>{
    res.status(404).render('404',{title:'Not Found Error'});
})