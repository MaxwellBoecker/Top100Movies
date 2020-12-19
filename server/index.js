const express = require('express');
require('dotenv').config();
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const bodyParser = require('body-parser');
const { PORT } = process.env;
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).send('You have reached the server');
});

app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

module.exports = {
  app,
}