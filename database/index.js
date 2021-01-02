// postgres database
const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE, PASSWORD, USER, ENV, DATABASE_URL,
} = process.env;
let pool;
if (ENV === 'production') {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: USER,
    host: 'localhost',
    database: DATABASE,
    password: PASSWORD,
  });
}

module.exports = {
  pool,
};
