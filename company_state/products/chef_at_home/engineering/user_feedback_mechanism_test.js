const assert = require('assert');
const userFeedbackMechanism = require('./user_feedback_mechanism');

describe('User Feedback Mechanism', function() {
    it('should gather feedback from users', function() {
        const feedback = userFeedbackMechanism.collectFeedback('Great app!');
        assert.strictEqual(feedback.message, 'Great app!');
        assert.strictEqual(feedback.timestamp instanceof Date, true);
    });

    it('should return an error for empty feedback', function() {
        const feedback = userFeedbackMechanism.collectFeedback('');
        assert.strictEqual(feedback.error, 'Feedback cannot be empty.');
    });
});