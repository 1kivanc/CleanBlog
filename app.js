const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
const Blog = require('./models/blog');
const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const fs = require('fs');
const BlogController = require('./controllers/blogController');
const PageController = require('./controllers/pageController');

const password = process.env.Password;


// Connect DB
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://kivanc:${password}@cluster0.alvmofa.mongodb.net/?retryWrites=true&w=majority`);

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(
  methodOverride('_method',{
    methods: ['POST','GET'],
  })
);
const port = process.env.PORT ||  3000;
const blog = {
  id: 1,
  title: 'Blog title',
  description: 'Blog description',
};

app.get('/blogs/:id', BlogController.getBlog);

app.get('/', BlogController.getAllBlogs);

app.get('/about', PageController.getAboutPage);

app.get('/add_post', PageController.getAddPage);

app.get('/post',PageController.getPostPage);

app.post('/blogs', BlogController.createBlog);

app.get('/blogs/edit/:id', PageController.getEditPage);
app.put('/blogs/:id',BlogController.updateBlog)
app.delete('/blogs/:id', BlogController.deleteBlog)

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
