class LessonEngine {
  constructor() {
    this.currentStep = 0;
    this.steps = [];
    this.timers = {};
    this.isLessonComplete = false;
  }

  loadLesson(lessonData) {
    this.steps = lessonData.steps;
    this.timers = lessonData.timers || {};
    this.currentStep = 0;
    this.isLessonComplete = false;
    console.log('Lesson loaded. Starting step:', this.currentStep);
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      console.log('Moving to step:', this.currentStep);
      // Potentially trigger UI updates or start timers here
      return true;
    } else {
      this.isLessonComplete = true;
      console.log('Lesson complete!');
      return false;
    }
  }

  getCurrentStep() {
    return this.steps[this.currentStep];
  }

  hasTimer(stepIndex) {
    return this.timers.hasOwnProperty(stepIndex);
  }

  getTimerDuration(stepIndex) {
    return this.timers[stepIndex];
  }

  // Placeholder for 'Got it' check - in a real app, this would be a user interaction
  userConfirmedStep() {
    console.log('User confirmed step.');
    // In a real app, this would trigger nextStep() after validation or timer completion
    return this.nextStep();
  }
}

module.exports = LessonEngine;
