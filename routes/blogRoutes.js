const express = require('express');
const router = express.Router();
const blogControllers = require('../controllers/blogController')

router.get('/',blogControllers.blog_index);
router.get('/create',blogControllers.blog_create_get);
router.get('/:id',blogControllers.blog_details);
router.delete('/:id',blogControllers.blog_delete);
router.post('/',blogControllers.blog_create_post);

module.exports=router;