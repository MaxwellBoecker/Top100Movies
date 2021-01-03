/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');

const { expect } = chai;
chai.use(chaiHttp);
const { testPool } = require('./testDatabaseSetup');
const { createMoviePromises, createUserPromise, combinePromises, createUserMoviePromises } = require('./testDatabaseSetup/seedingFunctions.js');

describe('test database works', () => {
  before('seed database with data', async () => {
    const moviePromises = createMoviePromises();
    const userPromise = createUserPromise();
    const promises = combinePromises(moviePromises, userPromise);
    const data = await Promise.all(promises);
    const userId = data.pop().rows[0].id;
    const userMoviePromises = createUserMoviePromises(userId);
    await Promise.all(userMoviePromises);
  });
  after('empty tables in database', async () => {
    try {
      await testPool.query('delete from user_movie');
      await testPool.query('delete from movies');
      await testPool.query('delete from users');
    } catch (err) {
      console.log(err);
    }
  });

  it('should contain 4 rows in the movie table', (done) => {
    testPool.query('select * from movies', (err, resp) => {
      expect(resp.rows.length).to.equal(4);
      done();
    });
  });
  it('should contain 1 row in the users table', (done) => {
    testPool.query('select * from users', (err, resp) => {
      if (err) {
        console.log(err);
      }
      // console.log(resp.rows);
      expect(resp.rows.length).to.equal(1);
      done();
    });
  });
  it('should contain 4 rows in the user_movie table', () => {
    testPool.query('select * from user_movie', (err, resp) => {
      expect(resp.rows.length).to.equal(4);
    });
  });
});
