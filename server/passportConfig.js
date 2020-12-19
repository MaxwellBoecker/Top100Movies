require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const { pool } = require('../database');

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
    } else {
      console.log(resp.rows);
    }
  });
  done();
})));

module.exports = {

};
