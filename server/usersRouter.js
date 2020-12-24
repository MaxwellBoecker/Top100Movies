const express = require('express');
require('dotenv').config();
const { pool } = require('../database/index');

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
const userRouter = express.Router();

userRouter.get('/', isLoggedIn, (req, res) => {
  pool.query('select * from users', (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(resp.rows);
      res.status(200).send(resp.rows);
    }
  });

  // res.status(401).send('unauthorized');
});

// userRouter.post('/', (req, res) => {
//   const { name, email, google_id } = req.body;

//   pool.query('insert into users (google_id, name, email) values ($1, $2, $3) on conflict (google_id) do nothing', [google_id, name, email], (err, resp) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     } else {
//       console.log(resp);
//       if (resp.rowCount === 0) {
//         res.status(201).send('user already exists');
//       } else {
//         res.status(201).send('user created');
//       }
//     }
//   });
// });

module.exports = {
  userRouter,
};
