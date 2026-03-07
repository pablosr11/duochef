// Full Functionality Tests for ChefAtHome App

const assert = require('assert');
const app = require('../app');

describe('ChefAtHome Full Functionality Tests', function() {
    it('should load the landing page successfully', function(done) {
        app.get('/', function(res) {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should allow users to submit their email to the waitlist', function(done) {
        app.post('/waitlist', { email: 'test@example.com' }, function(res) {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should track user engagement metrics', function(done) {
        // Simulate user engagement tracking
        app.trackEngagement({ userId: '123', action: 'lesson_completed' }, function(res) {
            assert.equal(res.statusCode, 200);
            done();
        });
    });
});