const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { pool } = require('../database/index');

const movieRouter = express.Router();
const { TMDB_KEY } = process.env;

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

movieRouter.get('/', isLoggedIn, async (req, res) => {
  const { title } = req.query;
  const options = {
    params: {
      api_key: TMDB_KEY,
      query: title,
    },
  };

  try {
    const data = await axios.get('https://api.themoviedb.org/3/search/movie', options);
    // console.log(data.data);
    res.status(200).send(data.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// movieRouter.post('/', isLoggedIn, (req, res) => {
//   console.log(req.body);
//   const {
//     title, original_language, overview, poster_path, backdrop_path, id,
//   } = req.body.data;
//   pool.query('insert into movies (title, original_language, overview, poster_path, backdrop_path, movie_id) values ($1, $2, $3, $4, $5, $6) on conflict (movie_id) do nothing returning id',
//     [title, original_language, overview, poster_path, backdrop_path, id], (err, resp) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send(err);
//       } else {
//         console.log(resp.rows);
//         res.status(201).send(resp.rows);
//       }
//     });
//   // res.status(201).send('success!');
// });

module.exports = {
  movieRouter,
};
