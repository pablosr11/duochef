// Final Testing for Interactive Engine

// Test to ensure the interactive engine initializes correctly
function testEngineInitialization() {
    const engine = new InteractiveEngine();
    console.assert(engine.isInitialized() === true, 'Engine should be initialized');
}

// Test to ensure lessons can be loaded
function testLoadLessons() {
    const lessons = engine.loadLessons();
    console.assert(lessons.length > 0, 'Lessons should be loaded');
}

// Test to ensure user progress is tracked
function testUserProgressTracking() {
    engine.startLesson(1);
    engine.completeLesson(1);
    const progress = engine.getUserProgress();
    console.assert(progress.completedLessons.includes(1), 'User progress should track completed lessons');
}

// Run all tests
function runTests() {
    testEngineInitialization();
    testLoadLessons();
    testUserProgressTracking();
    console.log('All tests completed');
}

runTests();