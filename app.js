const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
const port = 3000;
const blog = {
  id: 1,
  title: 'Blog title',
  description: 'Blog description',
};
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post',(req,res) => {
    res.render('add_post')
});

app.get('/post',(req,res) => {
    res.render('post')
})

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});