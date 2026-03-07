// Tests for the Interactive Lesson Engine
const InteractiveLessonEngine = require('./interactive_lesson_engine_refinements.js');

describe('InteractiveLessonEngine', () => {
    let engine;

    beforeEach(() => {
        engine = new InteractiveLessonEngine();
    });

    test('should add a lesson', () => {
        const lesson = { id: 'boiling_water', title: 'Boiling Water' };
        engine.addLesson(lesson);
        expect(engine.lessons.length).toBe(1);
    });

    test('should start a lesson', () => {
        const lesson = { id: 'boiling_water', title: 'Boiling Water', start: jest.fn() };
        engine.addLesson(lesson);
        engine.startLesson('boiling_water');
        expect(lesson.start).toHaveBeenCalled();
    });

    test('should complete a lesson', () => {
        const lesson = { id: 'boiling_water', title: 'Boiling Water' };
        engine.addLesson(lesson);
        engine.startLesson('boiling_water');
        engine.completeLesson();
        expect(engine.getProgress()).toEqual({ 'boiling_water': true });
    });
});