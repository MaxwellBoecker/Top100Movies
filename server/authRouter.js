require('dotenv').config();
const express = require('express');
const { passport } = require('./passportConfig');

const authRouter = express.Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/movielist');
  },
);

authRouter.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = {
  authRouter,
};
