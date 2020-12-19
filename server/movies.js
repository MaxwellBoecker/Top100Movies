const express = require('express');
const axios = require('axios');
const movieRouter = express.Router();
require('dotenv').config();
const { TMDB_KEY } = process.env;


movieRouter.get('/', (req, res) => {
  const options = {
    params: {
      api_key: TMDB_KEY,
    }
  }
  axios.get('https://api.themoviedb.org/3/movie/550', options)
  .then(data => {
    console.log(data.data);
    res.status(200).send(data.data)

  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = {
  movieRouter,
}