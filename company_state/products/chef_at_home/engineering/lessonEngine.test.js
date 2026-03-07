const LessonEngine = require('./lessonEngine');

describe('LessonEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new LessonEngine();
  });

  test('should initialize with default state', () => {
    expect(engine.currentStep).toBe(0);
    expect(engine.steps).toEqual([]);
    expect(engine.timers).toEqual({});
    expect(engine.isLessonComplete).toBe(false);
  });

  test('should load a lesson correctly', () => {
    const lessonData = {
      steps: ['Step 1', 'Step 2'],
      timers: { 0: 30 },
    };
    engine.loadLesson(lessonData);
    expect(engine.steps).toEqual(['Step 1', 'Step 2']);
    expect(engine.timers).toEqual({ 0: 30 });
    expect(engine.currentStep).toBe(0);
  });

  test('should move to the next step', () => {
    const lessonData = {
      steps: ['Step 1', 'Step 2', 'Step 3'],
    };
    engine.loadLesson(lessonData);
    expect(engine.nextStep()).toBe(true);
    expect(engine.currentStep).toBe(1);
  });

  test('should mark lesson as complete when last step is reached', () => {
    const lessonData = {
      steps: ['Step 1'],
    };
    engine.loadLesson(lessonData);
    engine.nextStep();
    expect(engine.isLessonComplete).toBe(true);
  });

  test('should return the current step', () => {
    const lessonData = {
      steps: ['Step A', 'Step B'],
    };
    engine.loadLesson(lessonData);
    expect(engine.getCurrentStep()).toBe('Step A');
    engine.nextStep();
    expect(engine.getCurrentStep()).toBe('Step B');
  });

  test('should check for timer existence', () => {
    const lessonData = {
      steps: ['Step 1'],
      timers: { 0: 60 },
    };
    engine.loadLesson(lessonData);
    expect(engine.hasTimer(0)).toBe(true);
    expect(engine.hasTimer(1)).toBe(false);
  });

  test('should get timer duration', () => {
    const lessonData = {
      steps: ['Step 1'],
      timers: { 0: 60 },
    };
    engine.loadLesson(lessonData);
    expect(engine.getTimerDuration(0)).toBe(60);
  });

  test('should simulate user confirmation and move to next step', () => {
    const lessonData = {
      steps: ['Step 1', 'Step 2'],
    };
    engine.loadLesson(lessonData);
    expect(engine.userConfirmedStep()).toBe(true);
    expect(engine.currentStep).toBe(1);
  });
});
