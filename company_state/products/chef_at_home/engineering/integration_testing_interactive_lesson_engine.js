// Integration tests for the Interactive Lesson Engine

const assert = require('assert');
const { InteractiveLessonEngine } = require('./interactive_lesson_engine');

describe('InteractiveLessonEngine', function() {
    let engine;

    beforeEach(function() {
        engine = new InteractiveLessonEngine();
    });

    it('should initialize with default settings', function() {
        assert.strictEqual(engine.currentLesson, null);
        assert.strictEqual(engine.userProgress, 0);
    });

    it('should start a lesson', function() {
        engine.startLesson('boiling water');
        assert.strictEqual(engine.currentLesson, 'boiling water');
    });

    it('should track user progress', function() {
        engine.startLesson('boiling water');
        engine.completeStep();
        assert.strictEqual(engine.userProgress, 1);
    });

    it('should handle errors gracefully', function() {
        engine.startLesson('boiling water');
        const result = engine.completeStep('invalid step');
        assert.strictEqual(result, 'Error: Invalid step');
    });
});