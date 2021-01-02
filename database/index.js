// postgres database
const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE, PASSWORD, USER, HEROKU_HOST, HEROKU_DATABASE
} = process.env;
const pool = new Pool({
  user: USER,
  host: HEROKU_HOST || 'localhost',
  database: HEROKU_DATABASE || DATABASE,
  password: PASSWORD,
});

module.exports = {
  pool,
};
