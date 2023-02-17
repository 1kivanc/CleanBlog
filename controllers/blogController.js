const fs = require('fs');
const Blog = require('../models/blog');

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
};

exports.getBlog = async (req, res) => {
  //console.log(req.params.id);
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog,
  });
};

exports.createBlog = async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.save();

  res.redirect(`/blogs/${req.params.id}`);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
