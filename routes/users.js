const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// GET Register Page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('register', { error: 'All fields are required!' });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.render('register', { error: 'User already exists!' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Something went wrong. Try again!' });
  }
});

// GET Login Page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// POST Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
