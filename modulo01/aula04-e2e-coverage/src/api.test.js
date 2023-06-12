const { describe, it, before, after } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API Suite Test', () => {
  let app;
  before((done) => {
    app = require('./api');
    app.once('listening', done)
  })
  after(done => app.close(done))

  describe('/contact:get', () => {
    it('Should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app)
      .get('/contact')
      .expect(200);

      assert.strictEqual(response.text, 'contact us page');
    });
  });

  describe('/login:post', () => {
    it('Should request the login route and return HTTP Status 200', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({ username: 'Gabriel', password: '123' })
      .expect(200);

      assert.strictEqual(response.text, 'Logged in!');
    });

    it('Should request the login route and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'Gabriel Varela', password: '123' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, 'Logging failed!');
    });
  });

  describe('/hi:get - 404', () => {
    it('Should request unexisted route and return HTTP Status 404', async () => {
      const response = await supertest(app)
      .get('/hi')
      .expect(404);

      assert.strictEqual(response.text, 'Not found!');
    });
  });
});