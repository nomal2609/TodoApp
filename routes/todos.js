const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/users/login');
};

router.get('/', isAuthenticated, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.render('todos/list', { todos });
});

router.post('/create', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Todo.create({ title, description, user: req.user.id });
  res.redirect('/todos');
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Todo.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect('/todos');
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todos');
});

module.exports = router;
