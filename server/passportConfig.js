const express = require('express');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://localhost:8000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    return done(err, user);
    //  });
    done();
}
));


module.exports = {
  
}