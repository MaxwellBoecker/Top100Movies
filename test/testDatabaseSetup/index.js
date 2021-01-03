const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE_TEST, PASSWORD_TEST, HOST, USER_TEST,
} = process.env;
const testPool = new Pool({
  user: USER_TEST,
  host: HOST || 'localhost',
  database: DATABASE_TEST,
  password: PASSWORD_TEST,
});

module.exports = {
  testPool,
};
