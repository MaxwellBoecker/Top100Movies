require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const { pool } = require('../database');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8008/auth/google/callback',
},
((accessToken, refreshToken, profile, done) => {
  // select from users where id =
  // console.log(profile);
  const { id, displayName } = profile;
  const email = profile.emails[0].value;
  pool.query('select * from users where google_id = ($1)', [id], (err, resp) => {
    if (err) {
      done(err);
    } else if (resp.rows.length === 0) {
      pool.query('insert into users (google_id, name, email) values ($1, $2, $3)', [id, displayName, email], (err, resp) => {
        done(null, id);
      });
    } else {
      done(null, id);
    }
  });
})));

module.exports = {
  passport,
};
