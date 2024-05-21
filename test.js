const assert = require('assert');
const request = require('supertest');
const app = require('./api'); // When a module is required, it can be specified by its name without the file extension.

describe('developer API should have endpoints to', () => {
    // A test case definition. 'done' is a callback function that Mocha
    // uses to signal that the test is complete.
    it('get all developers', function(done) {
        // arrange
        const api = require('./api'); // Import the 'api.js' module, which exports an Express app.

        // act and assert
        // When using supertest to test an app the act and assert part 
        // of a test is done in one single step.
        request (app) // Initialize 'supertest'
        // Pattern used to secify a URL path.
        .get('/api/developers') // Perform a GET request to this endpoint
        .set('Accept', 'application/json')
        // .expect is a supertest's way to do assertions.
        .expect('Content-Type', /json/)
        .expect((res) => {
            assert.strictEqual(res.body.length, 3);
        })
        .expect(200, done); // 'done' callback is called to signal Mocha that the test is complete.
    });

    it('get the developer by their ID', function(done) {
        // arrange
        const api = require('./api');

        // act and assert
        request (app)
        .get('/api/developers/1')
        .set ('Accept', 'application/json')
        .expect((res) => {
            assert.strictEqual(res.body.id, 1);
        })
        .expect(200, done);
    });

    it('create a new developer', function(done) {
        // arrange

        // act and assert
        request(app)
        .post('/api/developers/')
        .set('Accept', 'application/json')
        .send({name: 'Elisabeth Boden', email: 'frauelisabeth@gmail.com'})
        .expect('Content-Type', /json/)
        .expect('location', /\/api\/developers\//) // a regular expression used to match any string that contains "/api/developers/".
        .expect((res) => {
            assert.strictEqual(res.body.name, 'Elisabeth Boden');
            assert.strictEqual(res.body.email, 'frauelisabeth@gmail.com');
        })
        .expect(201, done);
    });

    it('removes a developer with a specific ID and returns 204 status', function (done) {
        // arrange
        const api = require('./api');
        const devIdToDelete = 1;

        // act and assert
        request(app)
        .delete(`/api/developer/${devIdToDelete}`)
        .expect(204)
        .end((err, res) => {
            if (err) return done(err);

            // Verify that the developer was actually removed
            request(app)
            .get(`/api/developers/${devIdToDelete}`)
            .expect(404, done);
        });
    });

    it('returns status 404 if the developer does not exist', function(done) {
        // arrange
        const wrongDevId = 999;

        // act and assert
        request(app)
        .delete(`/api/developer/${wrongDevId}`)
        .expect(404, done);
    });

});