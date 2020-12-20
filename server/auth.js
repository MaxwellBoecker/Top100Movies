require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const { pool } = require('../database');

const authRouter = express.Router();

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://localhost:8000/auth/google/callback',
},
((accessToken, refreshToken, profile, done) => {
  // select from users where id =
  pool.query('select * from users', (err, resp) => {
    if (err) {
      console.log(err);
      done(err);
    } else {
      console.log(resp.rows);
      done(null, resp.rows);
    }
  });
  done();
})));

// auth routes in the auth router
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  }),
);

authRouter.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/UserProfile');
  },
);

authRouter.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
});

module.exports = {
  authRouter,
};
