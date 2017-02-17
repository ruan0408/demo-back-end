/**
 * Created by ruan0408 on 17/02/17.
 */
const request = require('supertest');
const app = require('../server');

describe('GET /api/users', function () {
   it('responds with json', function (done) {
       request(app)
           .get('/api/users')
           .expect('Content-Type', /json/)
           .expect(200)
           // .expect(body, function () {
           //     if (!('username' in body[0])) throw new Error("missing username key");
           // })
           .end(function(err, res) {
               if (err) return done(err);
               // console.log(res.body);
               done();
           });
   });
});