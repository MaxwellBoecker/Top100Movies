/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const passport = require('passport');
const { app } = require('../../server/index');
const { tmdbData } = require('../TMDBData/TMDBData');

const { TMDB_KEY } = process.env;
const { expect } = chai;
chai.use(chaiHttp);

const moviesRouterTests = () => {
  describe('movies router GET /', () => {
    let agent;
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

    it('should return 200 status and correct data for successful GET request', (done) => {
      nock('https://api.themoviedb.org')
        .get('/3/search/movie')
        .query({
          api_key: TMDB_KEY,
          query: 'Fight Club',
        })
        .reply(200, tmdbData);
      agent.get('/auth/google')
        .then((res) => {
          expect(res.status).to.equal(200);
          agent.get('/movies')
            .query({ title: 'Fight Club' })
            .then((res) => {
              const {
                backdrop_path, id, overview, poster_path, title, original_language,
              } = res.body.results[0];
              expect(res.status).to.equal(200);
              expect(res.body.results.length).to.equal(1);
              expect(backdrop_path).to.equal('/52AfXWuXCHn3UjD17rBruA9f5qb.jpg');
              expect(id).to.equal(550);
              expect(poster_path).to.equal('/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg');
              expect(title).to.equal('Fight Club');
              expect(overview).to.equal('A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.');
              expect(original_language).to.equal('en');
              done();
            }).catch((err) => {
              console.log(err);
              done(err);
            });
        })
        .catch((err) => console.log(err));
    });
    it('should return a 206 partial content for request without query param title', (done) => {
      agent.get('/auth/google')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          agent.get('/movies')
            .end((err, res) => {
              expect(res.status).to.equal(206);
              expect(res.text).to.be.a('string');
              // console.log(res);
              done();
            });
        });
    });
  });
};



module.exports = {
  moviesRouterTests,
};
