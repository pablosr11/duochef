// This file contains tests for the interactive engine

const assert = require('assert');
const { runLesson } = require('./lesson_runner');

describe('Interactive Engine Tests', () => {
    it('should run a lesson and track progress', () => {
        const result = runLesson('lesson_kitchen_orientation_tools');
        assert.strictEqual(result.status, 'completed');
        assert.strictEqual(result.progress, 100);
    });

    it('should handle user feedback correctly', () => {
        const feedback = { userId: 1, lessonId: 'lesson_kitchen_orientation_tools', rating: 5 };
        const result = submitFeedback(feedback);
        assert.strictEqual(result.success, true);
    });
});