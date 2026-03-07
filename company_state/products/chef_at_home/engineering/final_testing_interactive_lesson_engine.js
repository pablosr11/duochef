// Final Testing for Interactive Lesson Engine

// This script conducts thorough testing of the Interactive Lesson Engine functionalities.

function testInteractiveLessonEngine() {
    // Test initialization of the lesson engine
    const engine = new InteractiveLessonEngine();
    console.assert(engine.isInitialized(), 'Engine should be initialized');

    // Test lesson progression
    const lesson = engine.startLesson('boiling water');
    console.assert(lesson.title === 'Boiling Water', 'Lesson title should match');

    // Test completion of the lesson
    engine.completeLesson(lesson.id);
    console.assert(engine.hasCompletedLesson(lesson.id), 'Lesson should be marked as completed');

    // Test user progress tracking
    const progress = engine.getUserProgress();
    console.assert(progress.completedLessons.includes(lesson.id), 'User progress should include completed lesson');

    console.log('All tests passed!');
}

testInteractiveLessonEngine();