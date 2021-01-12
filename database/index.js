// postgres database
const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE, PASSWORD, USER, ENV, DATABASE_URL, NODE_ENV,
} = process.env;
let pool;
if (ENV === 'production') {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else if (NODE_ENV === 'test') {
  const {
    DATABASE_TEST, PASSWORD_TEST, HOST, USER_TEST,
  } = process.env;
  pool = new Pool({
    user: USER_TEST,
    host: HOST || 'localhost',
    database: DATABASE_TEST,
    password: PASSWORD_TEST,
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
