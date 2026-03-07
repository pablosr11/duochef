// Test for User Feedback Mechanism

const assert = require('assert');
const UserFeedback = require('./user_feedback');

describe('UserFeedback', function() {
    it('should collect user feedback correctly', function() {
        const feedback = new UserFeedback();
        feedback.collect('Great app!');
        assert.strictEqual(feedback.getFeedback().length, 1);
        assert.strictEqual(feedback.getFeedback()[0], 'Great app!');
    });

    it('should not accept empty feedback', function() {
        const feedback = new UserFeedback();
        feedback.collect('');
        assert.strictEqual(feedback.getFeedback().length, 0);
    });
});