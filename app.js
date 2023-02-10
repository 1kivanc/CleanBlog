const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Blog = require('./models/blog');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();



// Connect DB
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))
app.use(express.json())
const port = 3000;
const blog = {
  id: 1,
  title: 'Blog title',
  description: 'Blog description',
};

app.get('/blogs/:id', async(req,res) => {
   //console.log(req.params.id);
   const blog = await Blog.findById(req.params.id)
   res.render('post',{
    blog
   })
});

app.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.render('index',{
    blogs
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post',(req,res) => {
    res.render('add_post')
});

app.get('/post',(req,res) => {
    res.render('post')
});

app.post('/blogs', async (req,res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
