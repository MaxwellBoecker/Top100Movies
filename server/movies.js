const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { pool } = require('../database/index');

const movieRouter = express.Router();
const { TMDB_KEY } = process.env;

movieRouter.get('/', async (req, res) => {
  const { title } = req.query;
  console.log(title);
  const options = {
    params: {
      api_key: TMDB_KEY,
      query: 'fight club',
    },
  };

  try {
    const data = await axios.get('https://api.themoviedb.org/3/search/movie', options);
    console.log(data.data);
    res.status(200).send(data.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = {
  movieRouter,
};
