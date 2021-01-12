/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server/index');
const passport = require('passport');
require('dotenv').config();
const nock = require('nock');

const { expect } = chai;
chai.use(chaiHttp);
const { pool } = require('../database/index');
const {
  createMoviePromises, createUserPromise, combinePromises, createUserMoviePromises,
} = require('./testDatabaseSetup/seedingFunctions.js');

const { TMDB_KEY } = process.env;
const { tmdbData } = require('./TMDBData/TMDBData');
const { moviesRouterTests } = require('./unitTests/moviesRouterTests');

describe('authenticated route handler tests and setup', () => {
  describe('a new user should be created in the DB after login', () => {
    let agent;
    let userId;
    beforeEach(() => {
      agent = chai.request.agent(app);
      const strategy = passport._strategies.google;
      strategy._profile = {
        id: '12345',
        displayName: 'Daryl',
        emails: [{
          value: 'yes@yes.org',
        }],
      };
    });

    after('empty tables in database', async () => {
      try {
        await pool.query('delete from user_movie');
        await pool.query('delete from movies');
        await pool.query('delete from users');
      } catch (err) {
        console.log(err);
      }
    });

    it('should successfully log in', (done) => {
      agent.get('/auth/google')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should have one user in the database', (done) => {
      pool.query('select * from users', (err, res) => {
        if (err) {
          console.log(err);
          done(err);
        } else {
          // console.log(res.rows);
          userId = res.rows[0].id;
          expect(res.rows.length).to.equal(1);
          done();
        }
      });
    });
    it('should have 4 entries in the movies table', (done) => {
      const moviePromises = createMoviePromises();
      Promise.all(moviePromises)
        .then((res) => {
          // console.log(res);
          expect(res.length).to.equal(4);
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    it('should have 4 entries in the user_movie table', (done) => {
      const userMoviePromises = createUserMoviePromises(userId);
      Promise.all(userMoviePromises)
        .then((res) => {
          expect(res.length).to.equal(4);
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
    it('should retrieve all a user\'s movies under user_movie', (done) => {
      agent.get('/auth/google')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          agent.get('/usermovie')
            .end((err, res) => {
              if (err) {
                console.log(err);
                done(err);
              } else {
                // console.log(res.body);
                expect(res.status).to.equal(200);
                done();
              }
            });
        });
    });
    moviesRouterTests();
  });
});

// describe('setting up the test database', () => {
//   let agent;
//   before('seed database with data', async () => {
//     const moviePromises = createMoviePromises();
//     const userPromise = createUserPromise();
//     const promises = combinePromises(moviePromises, userPromise);
//     const data = await Promise.all(promises);
//     const userId = data.pop().rows[0].id;
//     const userMoviePromises = createUserMoviePromises(userId);
//     await Promise.all(userMoviePromises);
//     agent = chai.request.agent(app);
//     const strategy = passport._strategies.google;
//     strategy._profile = {
//       id: '12345',
//       displayName: 'Daryl',
//       emails: [{
//         value: 'yes@yes.org',
//       }],
//     };
//   });

//   after('empty tables in database', async () => {
//     try {
//       await pool.query('delete from user_movie');
//       await pool.query('delete from movies');
//       await pool.query('delete from users');
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   it('should contain 4 rows in the movie table', (done) => {
//     pool.query('select * from movies', (err, resp) => {
//       expect(resp.rows.length).to.equal(4);
//       done();
//     });
//   });
//   it('should contain 1 row in the users table', (done) => {
//     pool.query('select * from users', (err, resp) => {
//       if (err) {
//         console.log(err);
//       }
//       // console.log(resp.rows);
//       expect(resp.rows.length).to.equal(1);
//       done();
//     });
//   });
//   it('should contain 4 rows in the user_movie table', (done) => {
//     pool.query('select * from user_movie', (err, resp) => {
//       expect(resp.rows.length).to.equal(4);
//       done();
//     });
//   });
//   it('should retrieve all a user\'s movies under user_movie', (done) => {
//     agent.get('/auth/google')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         agent.get('/usermovie')
//           .end((err, res) => {
//             if (err) {
//               console.log(err);
//               done(err);
//             } else {
//               console.log(res.body);
//               expect(res.status).to.equal(200);
//               done();
//             }
//           });
//       });
//   });
//   it('should contain 2 rows in the users table', (done) => {
//     pool.query('select * from users', (err, resp) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(resp.rows);
//       expect(resp.rows.length).to.equal(2);
//       done();
//     });
//   });
//   moviesRouterTests();
// });
