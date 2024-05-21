const assert = require('assert');
const request = require('supertest');

describe('developer API should have endpoints to', () => {
    it('get all developers', function(done) {
        // arrange
        const api = require('./api.js');

        // act and assert
        // When using supertest to test an app the act and assert part 
        // of a test is done in one single step.
        request (api.app)
        .get('/api/developers')
        .set('Accept', 'application/json')
        // .expect is a supertest's way to do assertions.
        .expect('Content-Type', /json/)
        .expect(200, done); // done is a way that mocha handles asychronous actions
    });
});