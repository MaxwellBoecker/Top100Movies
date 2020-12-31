/* eslint-disable no-lonely-if */
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

userMovieRouter.get('/', isLoggedIn, (req, res) => {
  pool.query(`
  select * from user_movie where user_id = $1
  `, [1], (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).send('could not insert');
    } else {
      res.status(200).send(resp.rows);
    }
  });
});

userMovieRouter.post('/', (req, res) => {
  const {
    title, original_language, overview, poster_path, backdrop_path, id,
  } = req.body.data;
  let movieId;
  const userId = req.user.id;

  pool.query(
    'select * from movies where movie_id = $1', [id], (err, resp) => {
      if (err) {
        console.log(err);
        res.status(500).send('error finding movie');
      } else {
        if (resp.rows.length === 0) {
          pool.query(`
              INSERT INTO movies (title, original_language, overview, poster_path, backdrop_path, movie_id)
              values ($1, $2, $3, $4, $5, $6)
              ON CONFLICT (movie_id) DO NOTHING
              RETURNING id
           `,
          [title, original_language, overview, poster_path, backdrop_path, id], (err, resp) => {
            if (err) {
              console.log(err, 'err');
              res.status(500).send(err);
            } else {
              movieId = resp.rows[0].id;
              pool.query(`
                    insert into user_movie (user_id, movie_id)
                    values ($1, $2)
                    `, [userId, movieId], (err, resp) => {
                if (err) {
                  console.log(err);
                  res.status(500).send();
                } else {
                  console.log('success');
                  res.status(201).send('successfully added to');
                }
              });
            }
          });
        } else {
          movieId = resp.rows[0].id;
          pool.query(`
                    INSERT INTO user_movie (user_id, movie_id)
                    values ($1, $2)
                    `, [userId, movieId], (err, resp) => {
            if (err) console.log(err);
            else {
              res.status(201).send('successfully added to user_movie');
            }
          });
        }
      }
    },
  );
});

userMovieRouter.delete('/', isLoggedIn, (req, res) => {
  res.status(204).send('you\'ve hit the delete route');
});

module.exports = {
  userMovieRouter,
};
