const express = require('express');
require('dotenv').config();
const { movieRouter } = require('./movies');
const { PORT } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('You have reached the server')
});

app.use('/movies', movieRouter);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

module.exports = {
  app,
}