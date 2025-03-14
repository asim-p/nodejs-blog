const Blog = require('../models/blog');

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('home',{blogs:result,title:'Home'})
        })
        .catch(err=>{
            console.log(err);
        })
}
const blog_details = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
            res.render('detail',{title:result.title,blog:result})
        })
        .catch(err=>{
            res.status(404).render('404',{title:'Not Found Error'});
            console.log(err);
        })
}
const blog_create_get = (req,res)=>{
    res.render('create',{title:'Create a Blog'})
}
const blog_create_post = (req,res)=>{
    const newBlog = new Blog(req.body)
    newBlog.save()
    .then(() => {
        res.redirect('/'); 
    })
    .catch(err => {
        console.log(err);
    });
}
const blog_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({redirect:'/blogs'});
        })
        .catch(err => {console.log(err)});
}

module.exports = {
    blog_index,blog_details,blog_delete,blog_create_get,blog_create_post
}