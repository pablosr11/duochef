// Test cases for the interactive engine

const assert = require('assert');
const { InteractiveEngine } = require('./interactive_engine');

describe('InteractiveEngine', function() {
    let engine;

    beforeEach(function() {
        engine = new InteractiveEngine();
    });

    it('should initialize with default values', function() {
        assert.strictEqual(engine.currentStep, 0);
        assert.strictEqual(engine.isComplete, false);
    });

    it('should progress to the next step', function() {
        engine.nextStep();
        assert.strictEqual(engine.currentStep, 1);
    });

    it('should complete the lesson', function() {
        engine.completeLesson();
        assert.strictEqual(engine.isComplete, true);
    });

    // Additional tests can be added here
});