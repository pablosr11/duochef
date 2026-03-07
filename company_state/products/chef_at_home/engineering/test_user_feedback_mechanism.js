// Test for User Feedback Mechanism

describe('User Feedback Mechanism', () => {
    it('should collect user feedback correctly', () => {
        const feedback = collectFeedback('Great app!');
        expect(feedback).toBe('Great app!');
    });

    it('should handle empty feedback', () => {
        const feedback = collectFeedback('');
        expect(feedback).toBe('No feedback provided.');
    });
});