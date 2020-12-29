const express = require('express');
require('dotenv').config();
const { pool } = require('../database/index');

const userMovieRouter = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

userMovieRouter.get('/', (req, res) => {

});
userMovieRouter.post('/', (req, res) => {
  const {
    title, original_language, overview, poster_path, backdrop_path, id,
  } = req.body.data;
  console.log(req.user);

  pool.query(
    `WITH cte AS (
      INSERT INTO movies (title, original_language, overview, poster_path, backdrop_path, movie_id)
      values ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (movie_id) DO NOTHING
      RETURNING id
   )
   SELECT NULL AS result
   WHERE EXISTS (SELECT 1 FROM cte)
   UNION ALL
   SELECT id
   FROM movies
   WHERE movie_id = $6
     AND NOT EXISTS (SELECT 1 FROM cte)`,
    [title, original_language, overview, poster_path, backdrop_path, id], (err, resp) => {
      if (err) {
        console.log(err, 'err');
        res.status(500).send(err);
      } else {
        console.log(resp.rows, 'rows');

        // res.status(201).send(resp.rows);
      }
    },
  );
});

module.exports = {
  userMovieRouter,
};
