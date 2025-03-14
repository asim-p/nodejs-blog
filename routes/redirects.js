const express = require('express');

const router = express.Router();

router.get('/home',(req,res)=>{
    res.redirect('/blogs');
})

router.get('/',(req,res)=>{
    res.redirect('/blogs');
})

router.get('/index',(req,res)=>{
    res.redirect('/');
})

router.get('/aboutus',(req,res)=>{
    res.redirect('/about');
})

router.get('/createblog',(req,res)=>{
    res.redirect('/create');
})

module.exports = router;