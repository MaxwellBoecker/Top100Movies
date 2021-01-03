const { query } = require('express');
const { testPool } = require('./index');
const { movies } = require('./moviesSeedData');

const createMoviePromises = () => movies.map((m) => {
  const {
    id, title, original_language, overview, poster_path, backdrop_path,
  } = m;
  return testPool.query(`
          insert into movies (id, title, original_language, overview, poster_path, backdrop_path)
          values ($1, $2, $3, $4, $5, $6)
          on conflict (id) do nothing
        `, [id, title, original_language, overview, poster_path, backdrop_path]);
});

const createUserPromise = () => [testPool.query(`
    insert into users (google_id, name, email)
    values ($1, $2, $3)
    returning id
  `, ['123456', 'Billy', 'bill@bill.org'])];

const createUserMoviePromises = (userId) => movies.map((m) => {
  const { id } = m;
  return testPool.query(`insert into user_movie (user_id, movie_id)
    values ($1, $2)
    `, [userId, id]);
});

const combinePromises = (...arrays) => arrays.reduce((acc, cur) => {
  acc = acc.concat(cur);
  return acc;
}, []);

module.exports = {
  createMoviePromises,
  createUserPromise,
  combinePromises,
  createUserMoviePromises,
};
