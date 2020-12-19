// postgres database
const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE, PASSWORD, HOST, USER,
} = process.env;
const pool = new Pool({
  user: USER,
  host: HOST || 'localhost',
  database: DATABASE,
  password: PASSWORD,
  port: 5432,
});

module.exports = {
  pool,
};
