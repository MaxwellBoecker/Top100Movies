const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const { authRouter } = require('./auth');

const { PORT } = process.env;
const app = express();
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../build')));

passport.serializeUser((id, done) => {
  console.log(id, 'yolo');
  done(null, { id });
});
passport.deserializeUser((id, done) => {
  //sql query in here
  console.log('in here deser')
  done(null, id);
});
app.use(passport.initialize());
app.use(passport.session());
// app.get('/', (req, res) => {
//   res.status(200).send('You have reached the server');
// });
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/');
//   });
app.use('/auth', authRouter);
app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use('*', express.static(path.join(__dirname, '../build/index.html')));
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

module.exports = {
  app,
};
