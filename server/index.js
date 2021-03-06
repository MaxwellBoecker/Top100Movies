const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');
const cookieSession = require('cookie-session');
const { movieRouter } = require('./moviesRouter');
const { userRouter } = require('./usersRouter');
const { authRouter } = require('./authRouter');
const { pool } = require('../database');
const { userMovieRouter } = require('./userMovieRouter');

const { PORT } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['id'],
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((id, done) => {
  // console.log(id, 'in serialize');
  done(null, { id });
});
passport.deserializeUser((user, done) => {
  const { id } = user;
  pool.query('select * from users where id = ($1)', [id], (err, resp) => {
    if (err) {
      console.log(err);
      done(err);
    } else {
      // console.log('successfully deserialized');
      done(null, user);
    }
  });
});

app.use('/', express.static(path.join(__dirname, '../build')));
app.use('/auth', authRouter);
app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use('/usermovie', userMovieRouter);
app.use('*', express.static(path.join(__dirname, '../build/index.html')));
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

module.exports = {
  app,
};
