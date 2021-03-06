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
/*
`
  with user_movies as (
    select movie_id
    from user_movie
    where user_id = ($1)
  )
  select *
  from movies
  where id in (select movie_id from user_movies)
  `
*/
/**
 * `select * from movies m
  inner join user_movie um
  on um.movie_id = m.id
  inner join users u
  on u.id = um.user_id
  where user_id = ($1)
  `
 */

userMovieRouter.get('/', isLoggedIn, (req, res) => {
  const { id } = req.user;
  pool.query(`
  with user_movies as (
    select movie_id
    from user_movie
    where user_id = ($1)
  )
  select *
  from movies
  where id in (select movie_id from user_movies)
  `, [id], (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).send('could not select');
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
    'select * from movies where id = $1', [id], (err, resp) => {
      if (err) {
        console.log(err);
        res.status(500).send('error finding movie');
      } else {
        if (resp.rows.length === 0) {
          pool.query(`
              insert into movies (id, title, original_language, overview, poster_path, backdrop_path)
              values ($1, $2, $3, $4, $5, $6)
              on conflict (id) do nothing
              returning id
           `,
          [id, title, original_language, overview, poster_path, backdrop_path], (err, resp) => {
            if (err) {
              console.log(err, 'err');
              res.status(500).send(err);
            } else {
              movieId = resp.rows[0].id;
              pool.query(`
                    insert into user_movie (user_id, movie_id)
                    values ($1, $2)
                    on conflict (user_id, movie_id)
                    do nothing
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
                    insert into user_movie (user_id, movie_id)
                    values ($1, $2)
                    on conflict (user_id, movie_id)
                    do nothing
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
  pool.query('delete from user_movie where (movie_id, user_id) = ($1, $2)', [req.body.id, req.user.id], (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).send('problem occurred during deletion');
    } else {
      res.status(204).send();
    }
  });
});

module.exports = {
  userMovieRouter,
};
