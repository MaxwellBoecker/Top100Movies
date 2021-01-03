require('dotenv').config();
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL } = process.env;
const { pool } = require('../database');

let Strategy;
if (process.env.NODE_ENV === 'test') {
  console.log('pass', process.env.NODE_ENV)
  Strategy = require('passport-mocked').Strategy;
} else {
  Strategy = require('passport-google-oauth20').Strategy;
}
passport.use(new Strategy({
  name: 'google',
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL || 'http://localhost:8008/auth/google/callback',
},
((accessToken, refreshToken, profile, done) => {
  // select from users where id =
  const { id, displayName } = profile;
  const email = profile.emails[0].value;
  pool.query('select * from users where google_id = ($1)', [id], (err, resp) => {
    if (err) {
      console.log(err);
      done(err);
    } else if (resp.rows.length === 0) {
      pool.query('insert into users (google_id, name, email) values ($1, $2, $3) returning id', [id, displayName, email], (err, resp) => {
        if (err) {
          console.log(err);
          done(err);
        }
        done(null, resp.rows[0].id);
      });
    } else {
      // console.log(id, resp.rows[0].id, 'in config');
      done(null, resp.rows[0].id);
      // done(null, id);
    }
  });
})));

module.exports = {
  passport,
};
