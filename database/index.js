// postgres database
const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE, PASSWORD, HOST, USER, DATABASE_URL,
} = process.env;
const pool = new Pool({
  user: USER,
  host: DATABASE_URL || 'localhost',
  database: DATABASE,
  password: PASSWORD,
});

module.exports = {
  pool,
};
